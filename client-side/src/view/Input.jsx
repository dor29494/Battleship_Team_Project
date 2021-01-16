import React, { useContext, useRef, useEffect, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import FadeoutStatus from "./FadeoutStatus";
import styled, { keyframes } from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { flex, position, cool_shinig_green } from "../styles/Mixins";
import { MdContentCopy } from 'react-icons/md';
import { flash, __esModule } from 'react-animations';
import { nanoid } from "nanoid";

const flashAnimation = keyframes`${flash}`;

const Input = () => {

  const {
    set_player_room,
    both_players_connected,
    other_player_ships,
    random_board,
    set_random_board,
    player_is_ready,
    set_player_is_ready,
    both_players_ready,
    note_status,
    set_note_status,
    game_status,
    set_game_status,
    lock_other_player_board,
    winning,
    game_over_msg,
    set_game_over_msg,
  } = useContext(BsContext);

  // local states:
  const inputEl = useRef();
  const [show_host_button, set_show_host_button] = useState(true);
  const [show_host_url, set_show_host_url] = useState(false);
  const [host_url, set_host_url] = useState(null);
  const [copied_msg, set_copied_msg] = useState('');
  const [show_join_button, set_show_join_button] = useState(true);
  const [show_join_button_input, set_show_join_button_input] = useState(false);
  const [show_ready_box, set_show_ready_box] = useState(false);
  const [game_started, set_game_started] = useState(false);

  //
  const [join_flash, set_join_flash] = useState(false);
  const [connected, set_connected] = useState(false);


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

  const changeHandler = (event) => {
    if (event.target.value.length == 4) {
      set_note_status("Click JOIN to start!")
      set_join_flash(true);
    }
    else {
      set_join_flash(false);
    }
  };

  useEffect(() => {
    setTimeout(() => set_note_status(''), 3000);
  }, [note_status]);

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

  const newGame = () => {
    location.reload();
  }

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
  ${({ game_started, game_over_msg, connected }) => game_started && !game_over_msg ? 'display: none' : connected ? flex('center', false) : flex()};
  ${position('absolute', '30%')}
  right: ${({ connected }) => connected ? '-49%' : '0%'};
  height: 85%;
  width: 100%;
  background-color: ${({ connected }) => connected ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.6)'};
  padding-left: ${({ connected }) => connected ? '11.5%' : '1.5%'};
  z-index: 1;
`;

const MiniWrapper = styled.form`
  ${flex()}
  flex-direction: column;
  ${cool_shinig_green};
  height: 50%;
  width: 35%;
  border: 3px solid #00ff3c;
  border-radius: 50px;
  background: black;
  padding-bottom: 2%;
`;

const HostButton = styled(Button)``;

const JoinButton = styled(Button)``;

const StartButton = styled(Button)``;

const ReadyButton = styled(Button)``;

const Random = styled(Button)``;

const CopyButton = styled.button`
  font-size: 90%;
  ${position('relative', false, false, false, '85%')};

    &:hover {
      ${cool_shinig_green};
      background: #1aff1a;
      color: black;
    }
`;

const UrlHolder = styled.div`
  ${flex('center', false)};
  height: 4rem;
  width: 20rem;
  border: white 1px solid;
  border-radius: 4rem;
  outline: none; 
  transition: border 0.5s;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
`;

const InputHolder = styled.input`
  ${flex('center', false)};
  height: 4rem;
  width: 20rem; 
  border: white 1px solid;
  border-radius: 4rem;
  outline: none;
  transition: border 0.5s;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem;

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
  animation: 1s ${flashAnimation};
  animation-iteration-count: infinite;
  font-size: 2rem;
`;

const StaticStatus = styled.h1`
  color: white;
  text-align: center;
  font-size: 100%;
  margin: 5%;
`;

const GameOver = styled.div`
  ${flex()};
  flex-direction: column;
  ${position('fixed', '13%', false, '0', false)};
  height: 90%;
  width: 100%;
  background: rgba(0,0,0,0.8);
  font-weight: bold;
  font-size: 10rem;
  margin: 0;
  cursor: pointer;
`;




