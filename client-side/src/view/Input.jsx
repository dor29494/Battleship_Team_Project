import React, { useContext, useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsContext } from "../stateManager/stateManager";
import { MdContentCopy } from 'react-icons/md';
import { flash, __esModule } from 'react-animations';
import { Button } from "../styles/GlobalStyles";
import { nanoid } from "nanoid";
import FadeoutStatus from "./FadeoutStatus";
import Modal from "./MsgModal";

const flashAnimation = keyframes`${flash}`;

const Input = () => {

  const {
    set_player_room,
    both_players_connected,
    other_player_ships,
    player_is_ready,
    set_player_is_ready,
    both_players_ready,
    lock_other_player_board,
    random_board,
    set_random_board,
    game_status,
    set_connected,
    show_host_button,
    set_show_host_button,
    show_join_button,
    set_show_join_button,
    show_host_url,
    set_show_host_url,
    game_over_msg,
    set_game_over_msg,
    player_room,
    player_message,
    winning,
    note_status,
    connected,
    set_note_status,
    set_game_status,
  } = useContext(BsContext);

  

  //--------------------joining room-------------------------

  
  // local states:
  const inputEl = useRef();

  const [host_url, set_host_url] = useState(null);
  const [show_join_button_input, set_show_join_button_input] = useState(false);
  const [show_ready_box, set_show_ready_box] = useState(false);
  const [copied_msg, set_copied_msg] = useState('');
  const [game_started, set_game_started] = useState(false);

  //
  const [join_flash, set_join_flash] = useState(false);



const host_button = () => {
  if (!show_host_url) {
    set_show_join_button(false);
    set_show_host_url(true);
    set_host_url(nanoid(4));
  }
  else {
    set_show_host_url(false);
    set_show_join_button(true);
  }
}

const copy_id = () => {
  event.preventDefault();
  navigator.clipboard.writeText(host_url).then(function () {
    set_note_status("Id copied to clipboard!");
  });
}


useEffect(() => {
  setTimeout(() => {
    set_copied_msg('');
  }, 3000);
}, [copied_msg]);

const join_button = () => {
  if (!show_join_button_input) {
    set_show_host_button(false);
    set_show_join_button_input(true);
  }
  else if (show_join_button_input) {
    set_show_join_button_input(false);
    set_show_host_button(true);
  }
};

const start_button = () => {
  if (show_host_button) {
    set_show_host_button(false);
    set_player_room(host_url);
  }
  else if (show_join_button) {
    set_player_room(inputEl.current.value);
    set_show_join_button(false);
  }
  set_show_ready_box(true);
  set_connected(true);
}

const ready_button = () => {
  set_player_is_ready(true);
  set_show_ready_box(false);
};

const RandomBoard = () => {
  set_random_board(!random_board)
}

useEffect(() => {
  if (show_host_button && !show_join_button) { set_game_status("Please copy the room ID and send it to the other player. Then press start.") }
  else if (!show_host_button && show_join_button) { set_game_status("Please past the room ID. Then press start.") }
  else if (show_ready_box && !both_players_connected) { set_game_status("You are connected! Waiting for another player to connect...") }
  else if (other_player_ships && !both_players_ready) { set_game_status('Your oppnent is ready.') }
  else if (show_ready_box && both_players_connected) { set_game_status("You are both connected! Please set your board. then press ready.") }
  else if (player_is_ready && !both_players_ready) { set_game_status("Waiting for your opponent to be ready...") }
  else if (both_players_ready) {
    set_game_status("You are good to go! Good luck!");
    setTimeout(() => set_game_started(true), 2000);
  }
  if (!lock_other_player_board && game_started) { set_game_status("Its your turn") }
  else if (lock_other_player_board && game_started) { set_game_status('') }
}, [show_host_button, show_join_button, show_ready_box, both_players_connected, player_is_ready, other_player_ships, both_players_ready, lock_other_player_board]);

useEffect(() => {
  if (winning === true) {
    set_game_over_msg('YOU WON!!!');
    // set_connected(false);
  }
  else if (winning === false) {
    set_game_over_msg('you loose')
    // set_connected(false);
  }
}, [winning]);


  
  
  
const changeHandler = (event) => {
  if (event.target.value.length == 4) {
    set_note_status("Click JOIN to start!")
    set_join_flash(true);
  }
  else {
    set_join_flash(false);
  }
};
const newGame = () => {
  location.reload();
}
useEffect(() => {
  setTimeout(() => set_note_status(''), 3000);
}, [note_status])

const renderDecideder = () => {
  if (show_host_button && show_join_button) {
    return (
      <>
        <HostButton onClick={() => host_button()}>Host</HostButton>
        <JoinButton onClick={() => join_button()}>Join</JoinButton>
      </>
    );
  }

  else if (show_host_button && !show_join_button) {
    return (
      <>
        <HostButton onClick={() => host_button()}>Back</HostButton>
        <UrlHolder><CopyButton onClick={() => copy_id()}> {<MdContentCopy />} </CopyButton>{host_url}</UrlHolder>
        <StartButton onClick={() => start_button()}>Start</StartButton>
      </>
    )
  }
  else if (!show_host_button && show_join_button) {
    return (
      <>
        <JoinButton onClick={() => join_button()}>Back</JoinButton>
        <InputHolder placeholder="Enter game id" ref={inputEl} onChange={changeHandler} />
        <StartButton onClick={() => start_button()}>Start</StartButton>
      </>
    )
  }
  else if (show_ready_box && both_players_connected) {
    return (
      <>
        <ReadyButton onClick={() => ready_button()}>{!player_is_ready ? <Flash>Ready</Flash> : 'Ready!'}</ReadyButton>
        <Random onClick={RandomBoard}>Random</Random>
      </>
    )
  }
}

return (
  <>
    <FadeoutStatus />
    <InputWrapper connected={connected} game_over_msg={game_over_msg} game_started={game_started}>
      {!game_over_msg ?
        <MiniWrapper>
          <StaticStatus>{game_status}</StaticStatus>
          {renderDecideder()}
        </MiniWrapper>
        : <GameOver>{game_over_msg}<br /><Button onClick={() => newGame()}>New Game!</Button></GameOver>}
    </InputWrapper>
  </>
);
}
export default Input;

const InputWrapper = styled.div`
    // border: 1px solid white;
    background-color: ${({ connected }) => connected ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.6)'};
    display: ${({ game_started, game_over_msg }) => game_started && !game_over_msg ? 'none' : 'flex'};
    justify-content: ${({ connected }) => connected ? ' ' : 'center'};
    padding-left: ${({ connected }) => connected ? '7.7%' : '1.5%'};
    align-items: center;
    height: 80%;
    top: 16%;
    width: 100%;
    right: ${({ connected }) => connected ? '-49%' : '0%'};
    position: absolute;
    z-index: 100;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `;

const MiniWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2%;
  // height: 35%;
  // width: 20%;
  height: 50%;
  width: 35%;
  background: black;
  border: 3px solid #00ff3c;
  // -webkit-box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.81); 
  // box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.81);
  -webkit-box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75); 
box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75);
  border-radius: 50px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const HostButton = styled(Button)``;

const JoinButton = styled(Button)``;

const StartButton = styled(Button)``;

const ReadyButton = styled(Button)``;

const Random = styled(Button)``;

const CopyButton = styled.button`
font-size: 90%;
  position: relative;
  left: 85%;
  &:hover {
    background: #1aff1a;
    color: black;
    -webkit-box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75); 
box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75);
  }
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
  font-size: 1.5rem;
  z-index: 1;
  align-items: center;
  display: flex;
`;

const InputHolder = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  height: 4rem;
  width: 20rem;
  border-radius: 4rem;
  border: white 1px solid;
  transition: border 0.5s;
  font-size: 1.5rem;
  z-index: 1;
  outline: none;
  align-items: center;
  display: flex;
  background: none; 
  color: #00ff41;
  caret-color: white;

    &:focus {
      border: white 1px dashed;
    }

    ::placeholder {
    color: white;
    }
`;

const Flash = styled.h1`
font-size: 2rem;
animation: 1s ${flashAnimation};
animation-iteration-count: infinite;
`;

const StaticStatus = styled.h1`
// border: 1px solid white;
font-size: 100%;
text-align: center;
color: white;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
margin: 5%;
`;

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
font-weight: bold;
background: rgba(0,0,0,0.8);
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
font-size: 10rem;
flex-direction: column;
margin: 0;
`;




