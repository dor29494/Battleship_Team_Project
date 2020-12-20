import { version } from "react";

const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal'
const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const random_boolean = () => Math.random() < 0.5;

const RUSSIAN = 'RUSSIAN';
const FRENCH = 'FRENCH';
const SEA = 'SEA';
const MISS = 'MISS';
const HIT = 'HIT';
const SINK = 'SINK';
const AROUND_SINK = 'AROUND_SINK';
const SHIP_PART = 'SHIP_PART';
const AROUND_SHIP = 'AROUND_SHIP';


const update_board_square_around_sink = (board, x, y) => {
    const new_board = [...board];
    if (new_board[x][y].value !== MISS)
        new_board[x][y].value = AROUND_SINK;
    return new_board;
}

const update_board_square_around_ship = (board, x, y) => {
    const new_board = [...board];
    new_board[x][y].around_ship = true;
    return new_board;
}

const update_board_around_a_ship = (board, ship, new_value) => {
    let new_board = [...board];
    const updater = (what_to_update, x, y) => {
        if (what_to_update === AROUND_SINK) {
            new_board = update_board_square_around_sink(board, x, y);
        }
        else if (what_to_update === AROUND_SHIP) {
            new_board = update_board_square_around_ship(board, x, y);
        }
    }
    // updater(new_value, x, y)
    if (ship.direction = HORIZONTAL) {
        switch (ship.ship_parts[0].x) {
            case 0:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                            }
                            updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                        }
                        break;
                    case 9:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            }
                            updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                        }
                        break;

                    default:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            }
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                            }
                            updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                        }
                        break;
                }
                break;

            case 9:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                            }
                            updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                        }

                        break;
                    case 9:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            }
                            updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                        }

                        break;

                    default:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            }
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                            }
                            updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                        }
                        break;
                }
                break;

            default:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                            }
                            updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                        }
                        break;
                    case 9:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                            }
                            updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                        }
                        break;

                    default: {
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                            }
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                            }
                            updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                        }
                        break;
                    }
                }
                break;
        }
    }
    if (ship.direction = VERTICAL) {
        switch (ship.ship_parts[0].x) {
            case 0:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                        }
                        break;
                    case 9:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                        }
                        break;

                    default:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                        }
                        break;
                }
                break;

            case 9:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                        }

                        break;
                    case 9:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                        }

                        break;

                    default:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                        }
                        break;
                }
                break;

            default:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                            }
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                        }
                        break;
                    case 9:
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                            }
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                        }
                        break;

                    default: {
                        for (let i = 0; i < ship.length; i++) {
                            if (i === 0) {
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x - 1, ship.ship_parts[i].y);
                            }
                            if (i === ship.length - 1) {
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y + 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y - 1);
                                updater(new_value, ship.ship_parts[i].x + 1, ship.ship_parts[i].y);
                            }
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y - 1);
                            updater(new_value, ship.ship_parts[i].x, ship.ship_parts[i].y + 1);
                        }
                        break;
                    }
                }
                break;
        }
    }
    return new_board
}

export const update_board_hit = (x = 0, y = 3, ship_index, Board = exmpBoard, ships) => {
    let new_SHIPS = { ...ships };
    let new_board = [...board];
    new_SHIPS[ship_index].ship_parts.filter((part) => part.x === x && part.y === y)[0].is_hit = true;

    let is_ship_sunk = true;
    for (const ship_part of new_SHIPS[ship_index].ship_parts) {
        if (!ship_part.is_hit)
            is_ship_sunk = false;
    }

    if (is_ship_sunk) {
        new_SHIPS[ship_index].is_sunk = is_ship_sunk;
        new_SHIPS = update_board_around_a_ship(new_board, new_SHIPS[ship_index], AROUND_SINK);

    }

    let is_win = true;
    for (const ship of new_SHIPS) {
        if (!ship.is_sunk)
            is_win = false;
    }

    new_board[x][y].is_hit = true;

    switch (x) {
        case 0:
            switch (y) {
                case 0:
                    new_board = update_board_square_around_sink(board, (x + 1), (y + 1));
                    break;
                case 9:
                    new_board = update_board_square_around_sink(board, (x + 1), (y - 1));
                    break;

                default:
                    new_board = update_board_square_around_sink(board, (x + 1), (y + 1));
                    new_board = update_board_square_around_sink(board, (x + 1), (y - 1));
                    break;
            }
            break;

        case 9:
            switch (y) {
                case 0:
                    new_board = update_board_square_around_sink(board, (x - 1), (y + 1));

                    break;
                case 9:
                    new_board = update_board_square_around_sink(board, (x - 1), (y - 1));

                    break;

                default:
                    new_board = update_board_square_around_sink(board, (x - 1), (y + 1));
                    new_board = update_board_square_around_sink(board, (x - 1), (y - 1));
                    break;
            }
            break;

        default:
            switch (y) {
                case 0:
                    new_board = update_board_square_around_sink(board, (x + 1), (y + 1));
                    new_board = update_board_square_around_sink(board, (x - 1), (y + 1));
                    break;
                case 9:
                    new_board = update_board_square_around_sink(board, (x + 1), (y - 1));
                    new_board = update_board_square_around_sink(board, (x - 1), (y - 1));
                    break;

                default:
                    new_board = update_board_square_around_sink(board, (x + 1), (y + 1));
                    new_board = update_board_square_around_sink(board, (x - 1), (y + 1));
                    new_board = update_board_square_around_sink(board, (x + 1), (y - 1));
                    new_board = update_board_square_around_sink(board, (x - 1), (y - 1));
                    break;
            }

            break;
    }

    if (is_ship_sunk)
        if (is_win)
            return 'WIN';
        else
            return { board: new_board, ships: new_SHIPS };
    else
        return { board: new_board };

}

export const inspect_hit = (board, x, y) => {
    if (board[x][y].value === SEA) {
        return MISS;
    }
    else if (board[x][y].value === SHIP_PART) {
        return HIT;
    }
    return `err in index x:${x} y:${y}`;
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
        let ship_head_x = null;
        let ship_head_y = null;

        re_place_ship: while (needs_placing) {

            // if (ship.direction === VERTICAL) {
            if (ship.direction === HORIZONTAL) {
                ship_head_x = random(9);
                ship_head_y = random(9 - ship.length);

                for (let i = 0; i < ship.length; i++) {

                    if (new_board[ship_head_x][ship_head_y + i].around_ship !== false) {
                        continue re_place_ship;
                    }
                }
                for (let i = 0; i < ship.length; i++) {
                    const new_ship_part = {
                        ship_index: index_of_ship,
                        x: ship_head_x,
                        y: ship_head_y + i,
                        is_hit: false,
                        value: SHIP_PART
                    }

                    ship.ship_parts.push(new_ship_part);

                    new_board[ship_head_x][ship_head_y + i] = new_ship_part;
                }
                console.log(index_of_ship);
            }

            // if (ship.direction === HORIZONTAL) {
            if (ship.direction === VERTICAL) {
                ship_head_x = random(9 - ship.length);
                ship_head_y = random(9);
                for (let i = 0; i < ship.length; i++) {
                    if (new_board[ship_head_x + i][ship_head_y].around_ship !== false) {
                        continue re_place_ship;
                    }

                }
                for (let i = 0; i < ship.length; i++) {
                    const new_ship_part = {
                        ship_index: index_of_ship,
                        x: ship_head_x + i,
                        y: ship_head_y,
                        is_hit: false,
                        value: SHIP_PART
                    }

                    ship.ship_parts.push(new_ship_part);

                    new_board[ship_head_x + i][ship_head_y] = new_ship_part;

                }
                console.log(index_of_ship);
            }
            // console.log(new_board);
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

    if (game_type === RUSSIAN) {
        return [{
            name: 'S1',
            length: 4,
            ship_parts: [],
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S2',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S3',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S4',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S5',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S6',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S7',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S8',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S9',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S10',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        ];
    }

    if (game_type === FRENCH) {
        return [{
            name: 'S1',
            length: 5,
            ship_parts: [],
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S2',
            ship_parts: [],
            length: 4,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S3',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S4',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S5',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        }
        ];
    }

    else
        return 'err, game type is non existing/unsuported'
}

console.log(place_ships(initial_game_board(), initial_ships()));