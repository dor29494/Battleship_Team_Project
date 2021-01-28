import React, { useContext, useEffect } from "react";
import { BsContext } from "../stateManager/stateManager";
const Sockets = () => {

    const {
        socket,
        playerRoom,
        setBothPlayersConnected,
        playerBoard,
        setOtherPlayerBoard,
        playerShips,
        setOtherPlayerShips,
        firstTurn,
        setFirstTurn,
        playerIsReady,
        playerGuess,
        setOtherPlayerGuess,
        playerMessage,
        setOtherPlayerMessage,
        chatMessage,
        setChatMessage,
        winning,
        setWinning,
        setShowDcModal,
        setOtherPlayerReady,
        setUsersCounter,
        playAgain,
        setPlayAgain,
        setLeave,
        setPlayAgainMsg
    } = useContext(BsContext);

    const randomize = (min, max) => Math.round(min + Math.random() * (max - min));

    const chat_message = 'chat_message'
    const play = "play";
    const ready = "ready";
    // ----------------------------------------emiting---------------------------------------

    // joining a room (clicking "start" button)
    useEffect(() => {
        socket.emit("data", { room: playerRoom, action: play });
        // localStorage.setItem('battleship_room', playerRoom);
    }, [playerRoom]);

    // ready to play (clicking "ready" button)
    useEffect(() => {
        if (firstTurn !== null) {
            socket.emit("data", {
                room: playerRoom,
                action: ready,
                board: playerBoard,
                ships: playerShips,
                turn: !firstTurn,
                to_player: "1",
            });
            console.log("this is player 2");
            console.log("player 2 emiting...");
        } else {
            let local_turn;
            const turn_generator = randomize(0, 1);
            turn_generator === 0 ? local_turn = true : local_turn = false;
            socket.emit("data", {
                room: playerRoom,
                action: ready,
                board: playerBoard,
                ships: playerShips,
                turn: !local_turn,
                to_player: "2",
            });
            if (playerRoom) { setFirstTurn(local_turn) }
            console.log("this is player 1");
            console.log("player 1 turn is " + local_turn);
            console.log("player 1 emiting...");
        }
    }, [playerIsReady]);

    // guessing (clicking on the opponents board)
    useEffect(() => {
        socket.emit("data", { room: playerRoom, guess: playerGuess });
        // console.log("emited guess");
    }, [playerGuess]);

    // send a message (using the chat)
    useEffect(() => {
        socket.emit("data", { room: playerRoom, action: chat_message, message: chatMessage[chatMessage.length - 1] });
    }, [playerMessage])

    // winning
    useEffect(() => {
        if (winning === true) { socket.emit("data", { room: playerRoom, is_winning: true }) }
    }, [winning]);

    // ---------------------------------------listening---------------------------------------

    useEffect(() => {
        socket.on("data", (data = {}) => {
            console.log(data)
            const { other_player_connected, turn, board, ships, ready_to_start, to_player, guess, message, is_winning, leave, users_count, wanna_play_again } = data;
            if (users_count) setUsersCounter(users_count);
            if (wanna_play_again) setPlayAgainMsg(true);
            if (other_player_connected) {
                setBothPlayersConnected(true);
            } else if (to_player === "2") {
                setOtherPlayerBoard(board);
                setOtherPlayerShips(ships);
                setFirstTurn(turn);
                // console.log("player's 1 data recived by player 2");
                console.log("does player2 starts?: " + turn);
                console.log("TOPLAYER2: ", data)
            } else if (to_player === "1") {
                setOtherPlayerReady(true);
                setOtherPlayerBoard(board);
                setOtherPlayerShips(ships);
                setFirstTurn(turn);
                console.log("player's 2 data recived by player 1");
                console.log("does player1 starts?: " + turn);
                //~~~~~~~~~~~~~~~
            }
            else if (guess) {
                // console.log("Player has recived the opponents guess", guess);
                setOtherPlayerGuess(guess);
            } else if (message) {
                console.log('I got message!')
                setOtherPlayerMessage((prev)=> [
                    ...prev,
                    message.msg
                ]);
                setChatMessage((prev) => [
                    ...prev,
                    {
                        id: message.id,
                        msg: message.msg,
                    },
                ]);
            } else if (is_winning) {
                // console.log("The other player won!");
                setWinning(!is_winning);
            } else if (leave) {
                setLeave(true);
                setShowDcModal(true);
            }
        }
        );
    }, [])
    //--------------- Play again ------------------------
    useEffect(() => {
        if (playAgain) {
            socket.emit("data", { play_again_emit: true, room: playerRoom });
            setPlayAgain(false);
        }
    }, [playAgain])
    return (
        <div></div>
    )
}

export default Sockets;
