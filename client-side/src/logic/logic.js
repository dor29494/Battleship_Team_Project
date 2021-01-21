import { VERTICAL, HORIZONTAL, RUSSIAN, FRENCH, SEA, MISS, HIT, AROUND_SINK, SHIP_PART, AROUND_SHIP } from "../stateManager/stateManager";
const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const random_boolean = () => Math.random() < 0.5;
//updates a square on the board after a ship part was hit or sunk
const update_board_square_around_sink = (board, x, y) => {
    const new_board = [...board];
    if (x >= 0 && y >= 0 && x <= new_board.length-1 && y <= new_board.length-1) {//!= undefined
        if (new_board[x][y].value !== MISS && new_board[x][y].value !== SHIP_PART) { //we want to keep miss visual, also not to change a sunken ship to a aroung sink bc of how loop works
            new_board[x][y].value = AROUND_SINK;
        }
    }
    return new_board;
};
//updates a square as one that is on the border of a ship, for placement purposes
const update_board_square_around_ship = (board, x, y) => {
    const new_board = [...board];
    if (x >= 0 && y >= 0 && x <= new_board.length-1 && y <= new_board.length-1) {//!= undefined
        if (new_board[x][y].value !== SHIP_PART) { //making sure we aren't changing the value of a ship part to be an around ship bc of how loop works
            new_board[x][y].around_ship = true;
        }
    }
    return new_board;
}
//used to update all the squares around a ship for placement and sinking
const update_board_around_a_ship = (board, ship, new_value) => {
    let new_board = [...board];
    const updater = (x, y) => {
        if (new_value === AROUND_SINK) {
            new_board = update_board_square_around_sink(board, x, y);
        }
        else if (new_value === AROUND_SHIP) {
            new_board = update_board_square_around_ship(board, x, y);
        }
    }
    const startX = ship.ship_parts[0].x - 1;
    const startY = ship.ship_parts[0].y - 1;
    const endX = ship.ship_parts[ship.length - 1].x + 1;
    const endY = ship.ship_parts[ship.length - 1].y + 1;
    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            updater(i, j);
        }
    }
    return new_board
}

export const update_board_hit = (x, y, ship_index, board, ships) => {
    let new_ships = [...ships];
    let new_board = [...board];
    const part_index = new_ships[ship_index].ship_parts.findIndex((part) => part.x === x && part.y === y);
    new_ships[ship_index].ship_parts[part_index].is_hit = true;
    new_board[x][y].is_hit = true;

    const is_ship_sunk = new_ships[ship_index].ship_parts.every((ship_part) => ship_part.is_hit);

    if (is_ship_sunk) {
        new_ships[ship_index].is_sunk = is_ship_sunk;
        new_board = update_board_around_a_ship(new_board, new_ships[ship_index], AROUND_SINK);
    }
    const is_win = new_ships.every((ship) => ship.is_sunk);

    for (let loopX = (x - 1); loopX <= x + 1; loopX++) {
        for (let loopY = (y - 1); loopY <= y + 1; loopY++) {
            if ((loopX + loopY) % 2 === (x + y) % 2) {
                new_board = update_board_square_around_sink(new_board, (loopX), (loopY));
            }
        }
    }
    return { board: new_board, ships: new_ships, is_win };
}

export const inspect_hit = (board, x, y) => {
    if (board[x][y].value === SHIP_PART) {
        return HIT;
    }
    return MISS;
}

export const update_board_miss = (board, x, y) => {
    const new_board = [...board];
    new_board[x][y].value = MISS;
    return new_board;
}

export const place_ships = (board, ships) => {
    let new_board = [...board];
    let new_ships = [...ships];
    new_ships.forEach((ship, index_of_ship) => {
        let needs_placing = true;
        const directional_adder = (limited, unlimited , num) => {
            if (ship.direction === VERTICAL) {
                return {ship_head_x: limited + num ,ship_head_y: unlimited}
            }
            if (ship.direction === HORIZONTAL) {
                return { ship_head_x: unlimited, ship_head_y: limited + num}
            }
        }
        
        re_place_ship: while (needs_placing) {            
            let unlimited = random(9);
            let limited = random(9 - ship.length);

            for (let i = 0; i < ship.length; i++) {
                let {ship_head_x} = directional_adder(limited, unlimited, i);
                let {ship_head_y} = directional_adder(limited, unlimited, i);
                if (new_board[ship_head_x][ship_head_y].around_ship !== false) {
                    continue re_place_ship;
                }
            }            
            for (let i = 0; i < ship.length; i++) {
                let {ship_head_x} = directional_adder(limited, unlimited, i);
                let {ship_head_y} = directional_adder(limited, unlimited, i);
                const new_ship_part = {
                    ship_index: index_of_ship,
                    x: ship_head_x,
                    y: ship_head_y,
                    is_hit: false,
                    value: SHIP_PART
                }
                ship.ship_parts.push(new_ship_part);

                new_board[ship_head_x][ship_head_y] = new_ship_part;
            }            
            new_board = update_board_around_a_ship(new_board, ship, AROUND_SHIP);
            needs_placing = false;
        }
    });

    return { board: new_board, ships: new_ships };
}

export const initial_game_board = (board = [[], [], [], [], [], [], [], [], [], []]) => {
    const new_board = [...board]
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            new_board[j].push({
                x: j,
                y: i,
                value: SEA,
                around_ship: false
            })
        }
    }
    return new_board;
}

export const initial_ships = (game_type = RUSSIAN) => {
    const ship_names = ['S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2', 'S1'];//names of the ships in reverse order of giving them
    const ships = [];//the soon to be returned ships array
    const make_ship = (length, name = ship_names.pop()) => { // default name is the last object of the mane array
        return {
            name,
            length,
            ship_parts: [],
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        }
    }
    if (game_type === FRENCH) {
        ships.push(make_ship(5)); // the ships unique to french var
    }
    ships.push(make_ship(4)); // the ships that are overlapping with both variations
    ships.push(make_ship(3));
    ships.push(make_ship(3));
    ships.push(make_ship(2));

    if (game_type === RUSSIAN) { // the ships unique to russian var
        ships.push(make_ship(2));
        ships.push(make_ship(2));
        for (let i = 0; i < 4; i++) {
            ships.push(make_ship(1));
        }
    }
    return ships;
}