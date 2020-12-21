const Primus = require('primus');
const { nanoid } = require('nanoid');

const primus = new Primus();

// -----------------------------------global variables------------------------------------

const randomize = (min, max) => Math.round(min + Math.random() * (max - min));
const play = 'play';
const ready = 'ready';

let player_room = nanoid();
let player_board = 'board';
let other_player_board;
let first_turn;
//
let example_guess;
turn_generator = randomize(0, 1) ? example_guess = "hit" : example_guess = "miss"


// ----------------------------------------emiting----------------------------------------

// play button
const play_button = () => {
    primus.write({ room: player_room, action: play });

    // return player_room;
    // present the player_room to the user (so he can send it to he's friend).
}

// should have an input where the player past the room id inside it.
const join_button = (join_input_value) => {
    player_room = join_input_value;
    primus.write({ room: player_room, action: play });
}

// ready button
const ready_button = () => {
    if (other_player_board) {
        primus.write({ room: player_room, action: ready, board: player_board });
    }
    else {
        // activating random turn generator
        const turn_generator = randomize(0, 1);
        turn_generator === 0 ? first_turn = true : first_turn = false;
        primus.write({ room: player_room, action: ready, board: player_board, turn: !first_turn });
    }
}

// onclick (on the grid)
// checking with the other_player_board if bulzai and send result to the server.
const player_guess = (player_guess) => {
    primus.write({ room: player_room, guess: player_guess });
    // if guess = miss => locking the grid.
}

// ---------------------------------------listening---------------------------------------

// primus.on('data', data => {
primus.on('data', (data = {}) => {
    const { room, action, guess, message, board, turn, ready_to_start } = data;

    if (turn !== undefined) {
        other_player_board = data.board;
        first_turn = data.turn;
        console.log("player's 1 data recived by player 2");
        console.log("board: " + board + " turn: " + turn);
    }
    else if (board) {
        // if (board) {
        other_player_board = data.board;
        console.log("player's 2 data recived by player 1");
        console.log("board: " + board + " turn: " + first_turn);
    }
    else if (ready_to_start && first_turn) {
        console.log("player's playing");
        // reactivating the grid.
    }
    else if (guess) {
        console.log(guess);
        // updating the board (array).
        // if guess = miss => reactivating the grid.
    }
});

const print = () => console.log(first_turn);

setTimeout(print, 15000);

    // module.exports = {
    //   play_button,
    //   join_button,
    //   ready_button,
    //   player_guess
    // }