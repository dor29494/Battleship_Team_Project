const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal'
const SEA = 'SEA';
const SHIPS = [{
    name: 'S1',
    length: 3,
    ship_parts: [{
        ship_index: 0,
        x: 2,
        y: 1,
        is_hit: false
    },
    {
        ship_index: 0,
        x: 2,
        y: 2,
        is_hit: false
    },
    {
        ship_index: 0,
        x: 2,
        y: 3,
        is_hit: false
    }],
    direction: VERTICAL,
    is_sunk: false
},
{
    name: 'S2',
    ship_parts: [{
        ship_index: 1,
        x: 0,
        y: 1,
        is_hit: false
    },
    {
        ship_index: 1,
        x: 0,
        y: 2,
        is_hit: false
    },
    {
        ship_index: 1,
        x: 0,
        y: 3,
        is_hit: false
    }],
    length: 3,
    direction: HORIZONTAL,
    is_sunk: false
},];
const MISS = 'MISS';
const HIT = 'HIT';
const SINK = 'SINK';
const AROUND_SINK = 'AROUND_SINK';

const exmpBoard =
    [[SEA, SHIPS[1].ship_parts[0], SHIPS[1].ship_parts[1], SHIPS[1].ship_parts[2], SEA, SEA, SEA, SEA, SEA, SEA], [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA], 
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA]
]

const update_board_hit = (x = 0, y = 3, ship_index, Board = exmpBoard) => {
    const new_SHIPS = { ...SHIPS };
    const new_board = [...board];
    new_SHIPS[ship_index].ship_parts.filter((part) => part.x === x && part.y === y)[0].is_hit = true;

    const is_ship_sunk = true;
    for (const ship_part of new_SHIPS[ship_index].ship_parts) {
        if (!ship_part.is_hit)
            is_ship_sunk = false;
    }

    const is_win = true;
    for (const ship of new_SHIPS) {
        if (!ship.is_sunk)
            is_win = false;
    }

    new_board[x][y].is_hit = true;

    switch (x) {
        case 0:
            switch (y) {
                case 0:
                    exmpBoard[x + 1][y + 1] = AROUND_SINK;
                    break;
                case 9:
                    exmpBoard[x + 1][y - 1] = AROUND_SINK;
                    break;

                default:
                    exmpBoard[x + 1][y + 1] = AROUND_SINK;
                    exmpBoard[x + 1][y - 1] = AROUND_SINK;
                    break;
            }
            break;

        case 9:
            switch (y) {
                case 0:
                    exmpBoard[x - 1][y + 1] = AROUND_SINK;

                    break;
                case 9:
                    exmpBoard[x - 1][y - 1] = AROUND_SINK;

                    break;

                default:
                    exmpBoard[x - 1][y + 1] = AROUND_SINK;
                    exmpBoard[x - 1][y - 1] = AROUND_SINK;
                    break;
            }
            break;

        default:
            exmpBoard[x + 1][y + 1] = AROUND_SINK;
            exmpBoard[x + 1][y - 1] = AROUND_SINK;
            exmpBoard[x - 1][y + 1] = AROUND_SINK;
            exmpBoard[x - 1][y - 1] = AROUND_SINK;

            break;
    }

    if (is_ship_sunk)
        if (is_win)
            return 'WIN';
        else
            return { new_board, new_SHIPS };
    else
        return { new_board };

}

const inspect_hit = (board, x, y) => {
    if (board[x][y] === SEA) {
        return MISS;
    }
    else if (typeof board[x][y] === "object") {
        return HIT;
    }
    return 'err';
}

const update_board_miss = () => {
    const new_board = [...board];
    new_board[x][y] = MISS;
    return new_board;
} 