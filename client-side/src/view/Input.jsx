import React, { useContext, useRef, useEffect, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { nanoid } from "nanoid";
import { MdContentCopy, MdNoEncryption, MdBorderAll } from 'react-icons/md';
import { Button } from "../styles/GlobalStyles";
import FadeoutStatus from "./FadeoutStatus";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { flash } from 'react-animations';
const flashAnimation = keyframes`${flash}`;
// const BigWrapper = styled.div`

// height: 100%;
// width: 100%;
// display: flex;
// align-items: center;
// align-conent: center;
// justify-items: center;
// justify-content: center`


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
    both_players_ready,
    winning,
    set_winning,
    random_board,
    set_random_board,
    lock_other_player_board,
    set_lock_other_player_board,
    set_show_modal,
    show_modal,
    connected,
    set_connected,
    status,
    set_status
  } = useContext(BsContext);
  const [join, set_join] = useState(false);
  const randomize = (min, max) => Math.round(min + Math.random() * (max - min));
  const play = "play";
  const ready = "ready";
  const inputEl = useRef();
  const [show_ready, set_show_ready] = useState(false);
  const [join_input, set_join_input] = useState(false);
  const [show_buttons, set_show_buttons] = useState(true);
  const [show_url, set_show_url] = useState(false);
  const [static_status, set_static_status] = useState('');
  const [game_over, set_game_over] = useState(null);
  const [join_flash, set_join_flash] = useState(false);

  // ----------------------------------------emiting---------------------------------------
  //--------------------joining room-------------------------
  const play_button = () => {
    if (show_url) { set_show_url(false) }
    else {
      set_join_input(false);
      set_show_url(true);
      set_player_room(nanoid(4));
      set_status("Send this id to your friend!")
    }
  }


  const join_button = () => {
    if (join_input && inputEl.current.value) {
      set_player_room(inputEl.current.value);
      set_show_ready(true);
      set_show_buttons(false);
      set_static_status("Connected!");
      set_status("Arrange your ships and click READY when your are!");
      set_connected(true);

    }
    else {
      if (show_url) { set_show_url(false) }
      if (!join_input) { set_status("Paste your game id") }
      set_join_input(!join_input);
    }
  };
  const copy_id = () => {
    event.preventDefault();
    // if (inputValue) { console.log(">>> ", inputValue) }
    navigator.clipboard.writeText(player_room).then(function () {
      set_status("Id copied to clipboard!");
      set_show_url(false);
    }, function () {
      /* clipboard write failed */
    });
  }
  // useEffect(() => {
  // if (ready_to_start) { set_static_status("Starting game...") }
  // else { set_static_status("Waiting for your opponent to be ready...") }
  // },[player_is_ready])
  useEffect(() => {
    console.log("room:", player_room);
    socket.emit("data", { room: player_room, action: play });
  }, [player_room]);

  //--------------------ready to play-------------------------
  let timer;
  const ready_button = () => {
    set_player_is_ready(true);
    set_static_status("Waiting for your opponent...");
    set_show_ready(false);

  };
  useEffect(() => {
    setTimeout(() => {
      set_status('');
    }, 3000);
  }, [status])
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
  //---------------------winning--------------------------

  useEffect(() => {

    if (winning === true) {
      set_game_over('YOU WON!!!');
      set_connected(false);
      socket.emit("data", { room: player_room, is_winning: true });
    }
    else if (winning === false) {
      set_game_over('you loose')
      set_connected(false);
    }
  }, [winning]);
  // ---------------------------------------listening---------------------------------------

  useEffect(() => {
    socket.on("data", (data = {}) => {
      // *** winning does not reach to the other player for some reason
      console.log("@@@@", data);
      const { turn, board, ready_to_start, to_player, ships, guess, is_winning, join, show_ready, leave, sunk } = data;
      if (leave) {
        set_show_modal(true)
      }
      if (is_winning) {
        console.log("The other player won!");
        set_game_over('you loose')
        console.log("is_winning: ", is_winning)
      }
      if (to_player === "2") {
        set_other_player_board(board);
        set_other_player_ships(ships);
        set_first_turn(turn);
        console.log("player's 1 data recived by player 2");
        set_static_status('Your oppnent is ready')
        console.log("does player2 starts?: " + turn);
      } else if (to_player === "1") {
        set_other_player_board(board);
        set_other_player_ships(ships);
        console.log("player's 2 data recived by player 1");
        console.log("does player1 starts?: " + turn);
      } else if (ready_to_start) {
        set_both_players_ready(true);
        set_static_status("Lets Go!!!");
        set_show_ready(false);
        set_connected(true);
      } else if (guess) {
        console.log("Player has recived the opponents guess", guess);
      }
      set_other_player_guess(guess);
      if (is_winning) {
        console.log("The other player won!");
        set_winning(!is_winning);
      }
      if (join) {
        set_show_ready(true);
        set_static_status('Connected!');
        set_connected(true);
        set_show_buttons(false);
        socket.emit("data", { room: player_room, show_ready: true });
        set_status("Arrange your ships and click READY when your are!");
      }
    })
  }, [])
  const RandomBoard = () => {
    set_random_board(random_board + 1);
  }

  useEffect(() => {
    // לא צריכים את זה יותר לדעתי
  }, [lock_other_player_board])
  const { width, height } = useWindowSize();
  const changeHandler = (event) => {
    if (event.target.value.length == 4) {
      set_status("Click JOIN to start!")
      set_join_flash(true);
    }
    else {
      set_join_flash(false);
    }
  }
  return (
    <>
      <FadeoutStatus />
      <Wrapper connected={connected} game_over={game_over} game_started={both_players_ready}>
        {!game_over ? <MiniWrapper>
          {static_status ? <StaticStatus>{static_status}</StaticStatus> : ' '}
          {show_buttons ? <PlayButton onClick={() => play_button()}>Host</PlayButton> : ' '}
          {show_buttons && show_url ? <UrlHolder><CopyButton onClick={() => copy_id()}><MdContentCopy /></CopyButton>{player_room}</UrlHolder> : ' '}
          {show_buttons ? <JoinButton onClick={() => join_button()}>{join_flash ? <Flash>Join!</Flash> : 'Join'}</JoinButton> : ' '}
          {show_buttons && join_input ? <InputHolder placeholder="Enter game id" join={join} ref={inputEl} onChange={changeHandler} /> : ' '}
          {show_ready ? <ReadyButton onClick={() => ready_button()}>{!player_is_ready ? <Flash>Ready</Flash> : 'Ready!'}</ReadyButton> : ' '}
          {!show_buttons && !player_is_ready ? <Random onClick={RandomBoard}>Random</Random> : ''}
          {show_modal ? <Modal /> : ' '}
        </MiniWrapper> : ' '}
        {game_over ? <GameOver onClick={() => location.reload()}>{game_over}</GameOver> : ' '}
      </Wrapper>
    </>
  );
}
export default Input;
const Wrapper = styled.div`
background-color: ${props => props.connected === false ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)'};
display: ${props => props.game_started && !props.game_over ? 'none' : 'flex'};
justify-content: ${props => props.connected ? ' ' : 'center'};
padding-left: ${props => props.connected ? '16%' : '2.5%'};
align-items: center;
height: 80%;
top: 20%;
width: 100%;
right: ${props => props.connected ? '-50%' : '0%'};
position: absolute;
z-index: 100;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;

`
const MiniWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2%;
  height: 30%;
  width: 20%;
  background: black;
  border: 3px solid #00ff3c;
  -webkit-box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.81); 
  box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.81);
  border-radius: 2%;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  
`;

const UrlHolder = styled.div`
padding: 0.5rem;
margin: 0.5rem;
  height: 4rem;
  width: 20rem;
    outline: none;
  border-radius: 4rem;
  border: white 1px solid;
  transition: border 0.5s;
  font-size: 1.2rem;
  z-index: 1;
  align-items: center;
display: flex;
`;

const PlayButton = styled(Button)``;

const InputHolder = styled.input`
margin: 0.5rem;
padding: 0.5rem;
  height: 4rem;
  width: 20rem;
  border-radius: 4rem;
  background: none;
  border: white 2px solid;
  transition: border 0.5s;
  font-size: 1.5rem;
  z-index: 1;
  outline: none;
  align-items: center;
color: #00ff41;
    &:focus {
      border: white 1px dashed;
    }
display: flex;
caret-color: white;
::placeholder {
  color: white;`
const JoinButton = styled(Button)``;
const CopyButton = styled.button`

  position: relative;
  left: 90%;
  &:hover {
    color: #008000;
  }
`
const ReadyButton = styled(Button)``
const Flash = styled.h1`
font-size: 2rem;
animation: 1s ${flashAnimation};
animation-iteration-count: infinite;
`
const StaticStatus = styled.h1`
font-size: 3rem;
color: white
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
`
const Random = styled(Button)``;






const Modal = () => {
  const ok = () => {
    set_show_modal(false)
    location.reload();
  }
  const {
    show_modal,
    set_show_modal
  } = useContext(BsContext);
  return (
    <ModalWrapper>
      <Dialog>
        <span>Your opponent just leaved the game.</span>
        <br />
        <Button onClick={() => ok()}>OK</Button>
      </Dialog>

    </ModalWrapper>
  )
}
const GameOver = styled.div`
cursor: pointer;
width: 100%;
height: 90%;
position: fixed;
top: 13%;
right: 0;
display: flex;
justify-content: center;
align-items: center;
font-size: 20rem;
font-weight: bold;
background: rgba(0,0,0,0.8);
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
`

const ModalWrapper = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
`
const Dialog = styled.div`
background: grey;
width: 60rem;
height: 30rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
z-index: 100;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
`