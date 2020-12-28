<<<<<<< HEAD
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import  { update_oppnent_grid }  from '../view/OppnentGrid';
import lockGrid from '../view/UserGrid';

const socket = io('ws://localhost:3000')
socket.emit("data", { message: "hello" });
=======
const Primus = require('primus-client');
const { nanoid } = require('nanoid');

const primus = new Primus();

>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
// -----------------------------------global variables------------------------------------

const randomize = (min, max) => Math.round(min + Math.random() * (max - min));
const play = 'play';
const ready = 'ready';

let player_room = nanoid();
<<<<<<< HEAD
let player_board;
let other_player_board;
let first_turn;
//
// let example_guess;
// turn_generator = randomize(0, 1) ? example_guess = "hit" : example_guess = "miss"

// ----------------------------------------emiting----------------------------------------

// adding the player board.
export const update_player_board = (board) => {
    player_board = board;
}

// play button
export const play_button = () => {
    socket.emit("data", { room: player_room, action: play });
=======
let player_board = 'board';
let other_player_board;
let first_turn;
//
let example_guess;
// turn_generator = randomize(0, 1) ? example_guess = "hit" : example_guess = "miss"


// ----------------------------------------emiting----------------------------------------

// play button
const play_button = () => {
    primus.write({ room: player_room, action: play });

>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
    return player_room;
    // present the player_room to the user (so he can send it to he's friend).
}

// should have an input where the player past the room id inside it.
<<<<<<< HEAD
export const join_button = (join_input_value) => {
    player_room = join_input_value;
    socket.emit("data",{ room: player_room, action: play });
}

// ready button
export const ready_button = () => {
    if (other_player_board) {
        socket.emit("data", { room: player_room, action: ready, board: player_board });
        console.log("room:" + player_room + ", action: " + ready + ", board: " + player_board);
=======
const join_button = (join_input_value) => {
    player_room = join_input_value;
    primus.write({ room: player_room, action: play });
}

// ready button
const ready_button = () => {
    if (other_player_board) {
        primus.write({ room: player_room, action: ready, board: player_board });
>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
    }
    else {
        // activating random turn generator
        const turn_generator = randomize(0, 1);
        turn_generator === 0 ? first_turn = true : first_turn = false;
<<<<<<< HEAD
        socket.emit("data", { room: player_room, action: ready, board: player_board, turn: !first_turn });
        console.log("room: " + player_room + ", action: " + ready + ", board: " + player_board + ",turn: " + !first_turn);
=======
        primus.write({ room: player_room, action: ready, board: player_board, turn: !first_turn });
>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
    }
}

// onclick (on the grid)
// checking with the other_player_board if bulzai and send result to the server.
<<<<<<< HEAD
export const player_guess = (player_guess) => {
    socket.emit("data",{ room: player_room, guess: player_guess });
=======
const player_guess = (player_guess) => {
    primus.write({ room: player_room, guess: player_guess });
>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
    // if guess = miss => locking the grid.
}

// ---------------------------------------listening---------------------------------------

<<<<<<< HEAD
// socket.on('data', data => {
    socket.on('data', (data = {}) => {
    const { guess, message, board, turn, ready_to_start } = data;
    console.log(data);

    if (turn !== undefined) {
        other_player_board = data.board;
        update_oppnent_grid(other_player_board);
=======
// primus.on('data', data => {
primus.on('data', (data = {}) => {
    const { room, action, guess, message, board, turn, ready_to_start } = data;

    if (turn !== undefined) {
        other_player_board = data.board;
>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
        first_turn = data.turn;
        console.log("player's 1 data recived by player 2");
        console.log("board: " + board + " turn: " + turn);
    }
    else if (board) {
<<<<<<< HEAD
        other_player_board = data.board;
        update_oppnent_grid(other_player_board);
=======
        // if (board) {
        other_player_board = data.board;
>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
        console.log("player's 2 data recived by player 1");
        console.log("board: " + board + " turn: " + first_turn);
    }
    else if (ready_to_start && first_turn) {
        console.log("player's playing");
        // reactivating the grid.
<<<<<<< HEAD
        lockGrid(false);
=======
>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
    }
    else if (guess) {
        console.log(guess);
        // updating the board (array).
<<<<<<< HEAD
        update_player_board(guess);
        // if guess = miss => reactivating the grid.
    }
});
=======
        // if guess = miss => reactivating the grid.
    }
});

const print = () => console.log(first_turn);

setTimeout(print, 15000);

    module.exports = {
      play_button,
      join_button,
      ready_button,
      player_guess
    }

>>>>>>> 0a39fba0129bb33be4fb886c32560d125076d6cd
