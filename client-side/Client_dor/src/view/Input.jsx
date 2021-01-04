import React, { useContext, useRef, useEffect } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled from "styled-components";
import { nanoid } from "nanoid";

const Input = () => {

  const {
    socket,
    player_room,
    set_player_room,
    player_board,
    set_other_player_board,
    player_ships,
    set_other_player_ships,
    first_turn,
    set_first_turn,
    player_guess,
    set_other_player_guess,
    player_is_ready,
    set_player_is_ready,
    set_both_players_ready,
    winning,
    set_winning
  } = useContext(BsContext);

  const randomize = (min, max) => Math.round(min + Math.random() * (max - min));

  const play = "play";
  const ready = "ready";
  const inputEl = useRef();

  // ----------------------------------------emiting---------------------------------------

  //--------------------joining room-------------------------
  const play_button = () => {
    set_player_room(nanoid());
  };

  const join_button = (input_value) => {
    set_player_room(input_value);
  };

  useEffect(() => {
    console.log("room:", player_room);
    socket.emit("data", { room: player_room, action: play });
  }, [player_room]);

  //--------------------ready to play-------------------------

  const ready_button = () => {
    set_player_is_ready(true);
  };

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
    console.log("emited guess");
  }, [player_guess]);
  //---------------------winnig--------------------------

  useEffect(() => {
    if (winning === true) {
      socket.emit("data", { room: player_room, is_winnig: winning });
      alert("you won!");
    }
    if (winning === false) {
      alert("you loose :[");
    }
  }, [winning]);

  // ---------------------------------------listening---------------------------------------

  useEffect(() => {
    socket.on("data", (data = {}) => {
      const { turn, board, ready_to_start, to_player, ships, guess, is_winnig } = data;

      if (to_player === "2") {
        set_other_player_board(board);
        set_other_player_ships(ships);
        set_first_turn(turn);
        console.log("player's 1 data recived by player 2");
        console.log("does player2 starts?: " + turn);
      } else if (to_player === "1") {
        set_other_player_board(board);
        set_other_player_ships(ships);
        console.log("player's 2 data recived by player 1");
        console.log("does player1 starts?: " + turn);
      } else if (ready_to_start) {
        console.log("both players are ready");
        set_both_players_ready(true);
      } else if (guess) {
        console.log("Player has recived the opponents guess", guess);
        set_other_player_guess(guess);
      }
      if (is_winnig) {
        console.log("The other player won!");
        set_winning(!is_winnig);
      }
    });
  }, [])
  
  return (
    <MiniWrapper>
      <PlayButton onClick={() => play_button()}>Play</PlayButton>
      <UrlHolder>{player_room}</UrlHolder>
      <JoinButton onClick={() => join_button(inputEl.current.value)}>
        Join
      </JoinButton>
      <InputHolder ref={inputEl} />
      <ReadyButton onClick={() => ready_button()}>Ready</ReadyButton>
    </MiniWrapper>
  );
};

export default Input;

const MiniWrapper = styled.form`
  display: flex;
  flex-direction: column;
  // border: 2px black solid;
  height: 100%;
  justify-content: space-around;
`;

const UrlHolder = styled.div`
  height: 4rem;
  width: 45rem;
  outline: none;
  border-radius: 4rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;
  z-index: 1;

    &:focus {
      border: tomato 2px solid;
    }
`;
const ReadyButton = styled.div`
  font-family: "Expletus Sans";
  text-align: left;
  font-size: 2rem;
  width: 20rem;
  height: 3rem;
  text-align: center;
  border-radius: 3rem;
  font-weight: 400;
  color: black;
  background: white;
  border: none;
  box-shadow: inset 0 0.1rem 1.5rem lightgrey;
  cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: 0px 0px yellow, -1em 0 04em white;
    }
`;

const PlayButton = styled(ReadyButton)``;

const InputHolder = styled.input`
  height: 4rem;
  width: 20rem;
  outline: none;
  border-radius: 4rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;
  z-index: 1;
  margin-bottom: 0.6rem;

    &:focus {
      border: tomato 2px solid;
    }
`;

const JoinButton = styled.div`
display: ${(inputValue) => (inputValue ? "flex" : "none")}
font-family: "Expletus Sans";
text-align: left;
font-size: 2rem;
width: 20rem;
max-height: 7rem;
text-align: center;
border-radius: 3rem;
font-weight: 400;
color: black;
background: white;
border: none;
box-shadow: inset 0 0.1rem 1.5rem lightgrey;
cursor: pointer;
margin-bottom: 0.6rem;

  &:focus{
    outline: none;
    box-shadow: 0px 0px yellow, -1em 0 04em white;
  }
`;
