import React, { useContext, useEffect } from "react";
import { BsContext } from "../stateManager/stateManager";
const Sockets = () => {

    const {
        socket,
        player_room,
        set_both_players_connected,
        player_board,
        set_other_player_board,
        player_ships,
        set_other_player_ships,
        first_turn,
        set_first_turn,
        player_is_ready,
        set_both_players_ready,
        player_guess,
        set_other_player_guess,
        player_message,
        other_player_message,
        set_other_player_message,
        chat_array_message,
        set_chat_array_message,
        player_id,
        winning,
        set_winning,
        set_show_dc_modal,
        set_other_player_ready,
        other_player_ready,
        set_player_is_ready,
        users_counter,
        set_users_counter,
        play_again,
        set_play_again,
        set_leave,
        set_play_again_msg,
        play_again_msg
    } = useContext(BsContext);

    const randomize = (min, max) => Math.round(min + Math.random() * (max - min));

    const chat_message = 'chat_message'
    const play = "play";
    const ready = "ready";
    // ----------------------------------------emiting---------------------------------------

    //--------------------joining room-------------------------

    useEffect(() => {
        socket.emit("data", { room: player_room, action: play });
        // localStorage.setItem('battleship_room', player_room);
    }, [player_room]);

    //--------------------ready to play-------------------------

    useEffect(() => {
        if (first_turn !== null) {
            socket.emit("data", {
                room: player_room,
                action: ready,
                board: player_board,
                ships: player_ships,
                turn: !first_turn,
                to_player: "1",
            });
            console.log("this is player 2");
            console.log("player 2 emiting...");
        } else {
            let local_turn;
            const turn_generator = randomize(0, 1);
            turn_generator === 0 ? local_turn = true : local_turn = false;
            socket.emit("data", {
                room: player_room,
                action: ready,
                board: player_board,
                ships: player_ships,
                turn: !local_turn,
                to_player: "2",
            });
            if (player_room) { set_first_turn(local_turn) }
            console.log("this is player 1");
            console.log("player 1 turn is " + local_turn);
            console.log("player 1 emiting...");
        }
    }, [player_is_ready]);

    //--------------------guessing-------------------------

    useEffect(() => {
        socket.emit("data", { room: player_room, guess: player_guess });
        // console.log("emited guess");
    }, [player_guess]);

    //------------------Send a message----------------------

    useEffect(() => {
        // console.log('Inside UseEffect of player_message:', chat_array_message[chat_array_message.length - 1])
        socket.emit("data", { room: player_room, action: chat_message, message: chat_array_message[chat_array_message.length - 1] });
    }, [player_message])

    //---------------------winning--------------------------

    useEffect(() => {
        if (winning === true) { socket.emit("data", { room: player_room, is_winning: true }) }
    }, [winning]);

    // ---------------------------------------listening---------------------------------------

    useEffect(() => {
        socket.on("data", (data = {}) => {
            console.log(data)
            const { other_player_connected, turn, board, ships, ready_to_start, to_player, guess, message, is_winning, leave, users_count, wanna_play_again } = data;
            if (users_count) set_users_counter(users_count);
            if (wanna_play_again) set_play_again_msg(true);
            if (other_player_connected) {
                set_both_players_connected(true);
            } else if (to_player === "2") {
                set_other_player_board(board);
                set_other_player_ships(ships);
                set_first_turn(turn);
                // console.log("player's 1 data recived by player 2");
                console.log("does player2 starts?: " + turn);
                console.log("TOPLAYER2: ", data)
            } else if (to_player === "1") {
                set_other_player_ready(true);
                set_other_player_board(board);
                set_other_player_ships(ships);
                set_first_turn(turn);
                console.log("player's 2 data recived by player 1");
                console.log("does player1 starts?: " + turn);
                //~~~~~~~~~~~~~~~
            }
            // else if (ready_to_start) {
            //     if (player_is_ready && other_player_ready) {
            //         set_both_players_ready(true);
            //         console.log("======================================");
            //         console.log("READY TO START: ", ready_to_start);
            //         console.log("DATA: ", data)
            //         // alert("READY!")
            //     }
            //     // set_game_status("Lets Go!!!");
            //     // ############
            // }
            else if (guess) {
                // console.log("Player has recived the opponents guess", guess);
                set_other_player_guess(guess);
            } else if (message) {
                // console.log('I got message!')
                set_other_player_message(...other_player_message, message);
                set_chat_array_message((prev) => [
                    ...prev,
                    {
                        id: player_id,
                        msg: message.msg,
                    },
                ]);
            } else if (is_winning) {
                // console.log("The other player won!");
                set_winning(!is_winning);
            } else if (leave) {
                set_leave(true);
                set_show_dc_modal(true);
            }
        }
        );
    }, [])
    //--------------- Play again ------------------------
    useEffect(() => {
        if (play_again) {
            socket.emit("data", { play_again_emit: true, room: player_room });
            set_play_again(false);
        }
    }, [play_again])
    return (
        <div></div>
    )
}

export default Sockets;
