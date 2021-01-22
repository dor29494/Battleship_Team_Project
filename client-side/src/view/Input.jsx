import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsContext } from "../stateManager/stateManager";
import { MdContentCopy } from 'react-icons/md';
import { flex, position, cool_shining_green } from "../styles/Mixins";
import { flash, __esModule } from 'react-animations';
import { Button } from "../styles/GlobalStyles";
import { nanoid } from "nanoid";
import FadeoutStatus from "./FadeoutStatus";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {

  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
} from "react-share";
import {

  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
} from "react-share";

const flashAnimation = keyframes`${flash}`;
const startGame = (props) => {
  const { set_connected, set_player_room, set_show_ready_box, set_show_start_button } = useContext(BsContext);
  let game_id = props.match.params.id;
  set_show_ready_box(true);
  set_connected(true);
  set_player_room(game_id);
  set_show_start_button(false);

  return <h1></h1>
}
const Input = () => {

  const {
    player_room,
    show_start_button,
    both_players_connected,
    other_player_ships,
    player_is_ready,
    set_player_is_ready,
    both_players_ready,
    lock_other_player_board,
    random_board,
    set_random_board,
    game_status,
    set_game_status,
    winning,
    note_status,
    set_note_status,
    game_over_msg,
    show_ready_box,
    set_show_ready_box,
    set_both_players_ready,
    set_game_started,
    game_started,
    set_play_again,
    leave,
    play_again_msg,
    set_mouseX,
    set_mouseY
  } = useContext(BsContext);
  // local states:
  const [copied_msg, set_copied_msg] = useState('');
  const [room_id, set_room_id] = useState(null);

  //
  const [waiting, set_waiting] = useState(false);



  useEffect(() => {
    set_room_id(nanoid(4));
  }, []);

  // copy the room ID so the player wont need to do in manually
  const copy_id = () => {
    event.preventDefault();
    set_mouseX(event.screenX);
    set_mouseY(event.screenY);
    navigator.clipboard.writeText(window.location.origin + "/" + room_id).then(function () {
      set_note_status("Id copied to clipboard!");
    });
  }

  // nullify the note after every use
  useEffect(() => {
    setTimeout(() => {
      set_note_status('');
    }, 2000);
  }, [note_status]);


  // nullify the copied message after every use
  useEffect(() => {
    setTimeout(() => {
      set_copied_msg('');
    }, 3000);
  }, [copied_msg]);


  // connect the player to the room
  const start_button_click = () => {
    location.href = window.location.origin + "/" + room_id;
  }

  // ready to play
  const ready_button = () => {
    set_player_is_ready(true);
    set_show_ready_box(false);
  };

  // set the board randomly
  const RandomBoard = () => {
    set_random_board(!random_board)
  }

  // set the game status message
  useEffect(() => {
    // if (play_again) return false;
    if (other_player_ships && !player_is_ready) {
      set_game_status('Your opponent is ready!');
      set_waiting(false);
      return false;
    }
    if (show_start_button) { set_game_status("Please copy the room ID and send it to your friend, Then press start.") }
    if (player_is_ready && !other_player_ships) {
      set_game_status("Waiting for your opponent to be ready...");
      set_show_ready_box(false);
      set_waiting(true);
      return false;
    }
    if (show_ready_box && !both_players_connected) {
      set_game_status("You are connected! Waiting for another player to connect...");
      set_waiting(true);
    }
    if (player_is_ready && other_player_ships) {
      set_waiting(false);
      set_game_status("You are good to go! Good luck!");
      set_show_ready_box(false);
      setTimeout(() => {
        set_game_started(true);
        set_both_players_ready(true);
      }
        , 2000);
      return false;
    }
    if (!lock_other_player_board && game_started) { set_game_status("Its your turn") }
    else if (lock_other_player_board && game_started) { set_game_status('') }
    else if (show_ready_box && both_players_connected) { set_game_status("You are both connected! Please set your board. then press ready.") }
  }, [show_start_button, show_ready_box, both_players_connected, player_is_ready, other_player_ships, both_players_ready, lock_other_player_board]);

  // set the game over message according to the player status (winning / losing)
  useEffect(() => {
    if (winning === true) {
      set_game_over_msg('YOU WON!!!');
    }
    else if (winning === false) {
      set_game_over_msg('you lose')
    }
  }, [winning]);

  // reload the page 
  const newGame = () => {
    location.reload();
  }

  // render the suitable buttons and inputs according to the player choices
  const renderDecideder = () => {

    if (show_start_button) {
      return (
        <>
          <UrlHolder><CopyButton onClick={() => copy_id()}> {<MdContentCopy />} </CopyButton>{window.location.origin}/{room_id}</UrlHolder>
          <ButtonsWrapper>
            <Button style={{ width: "4.5vw", height: "4.5vw" }}><FacebookShareButton url={`${window.location.origin}/${room_id}`}><FacebookIcon size={"5vw"} round={true} style={{ marginTop: "0.7vw" }} /></FacebookShareButton></Button>
            &nbsp; &nbsp;
            <Button style={{ width: "4.5vw", height: "4.5vw" }}><FacebookMessengerShareButton url={`${window.location.origin}/${room_id}`}><FacebookMessengerIcon size={"5vw"} round={true} style={{ marginTop: "0.7vw" }} /></FacebookMessengerShareButton></Button>
            &nbsp; &nbsp;
            <Button style={{ width: "4.5vw", height: "4.5vw" }}><WhatsappShareButton url={`${window.location.origin}/${room_id}`}><WhatsappIcon size={"5vw"} round={true} style={{ marginTop: "0.7vw" }} /></WhatsappShareButton></Button>
          </ButtonsWrapper>
          <Button onClick={() => start_button_click()}>Start</Button>
        </>
      )
    }
    else if (show_ready_box && both_players_connected) {
      return (
        <>
          <Button onClick={() => ready_button()}><Flash>Ready</Flash></Button>
          <Button onClick={RandomBoard}>Random</Button>
        </>
      )
    }
  }
  const PlayAgain = () => {
    if (!leave) {
      set_play_again(true);
      location.reload();
    }
  }
  return (
    <>
      <FadeoutStatus />
      <InputWrapper connected={player_room} game_over_msg={game_over_msg} game_started={game_started}>
        {!game_over_msg ?
          <MiniWrapper>
            <StaticStatus>{game_status}
              {waiting ? <Loader type="Grid" color="white" height={'5vw'} width={'5vw'} style={{ margin: "1vw" }} /> : ' '}
            </StaticStatus>
            {renderDecideder()}
          </MiniWrapper>
          : <GameOver>{game_over_msg}<Button onClick={() => location.href = window.location.origin}>New Game!</Button><PlayAgainButton error={leave} onClick={() => PlayAgain()}>{play_again_msg ? <Flash>Play Again!</Flash> : 'Play Again!'}</PlayAgainButton></GameOver>}
      </InputWrapper>
      <Switch>
        <Route path='/:id' component={startGame} />
      </Switch>
    </>
  );
}
export default Input;

const InputWrapper = styled.div`
  ${({ game_started, game_over_msg, connected }) => game_started && !game_over_msg ? 'display: none' : connected ? flex('center', false) : flex()};
position: absolute;
top: 12vw;
  z-index: 100;
  height: 60vw;
  width: 123vw;
  justify-content: center;
  background: rgba(0,0,0,0.8);
  @media only screen and (max-width: 600px)
    {
  width: 100%;
  height: 100%;
  left: -1vw;
  // top: 10%;
    }

`;

const MiniWrapper = styled.form`
  display: flex;
  flex-direction: column;
  ${cool_shining_green};
  // ${({ connected }) => connected ? `height: 50%; width: 100%;` : `height: 50%; width: 35%;`};
  border: 3px solid #00ff3c;
  -webkit-box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75); 
  box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75);
  border-radius: 2vw;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  // position: relative;
  z-index: 100;
  background: black;
  align-content: center;
  padding: 2%;
  @media only screen and (max-width: 600px)
  {
width: 50vw;
height: 50vw;
margin-bottom: 10vw;
  }
`;


const CopyButton = styled.button`
  font-size: 100%;
  ${position('relative', false, false, false, '85%')};

    &:hover {
      ${cool_shining_green};
      background: #1aff1a;
      color: black;
    }
`;

const UrlHolder = styled.div`
  padding: 1vw;
  margin: 1vw;
  height: 4vw;
  width: 25vw;
  outline: none; 
  border-radius: 4rem;
  border: white 1px solid;
  transition: border 0.5s;
  font-size: 1.5vw;
  z-index: 1;
  align-items: center;
  display: flex;
  @media only screen and (max-width: 600px)
  {

  }
`;
const Flash = styled.h1`
animation: 1s ${flashAnimation};
animation-iteration-count: infinite;
font-size: 2.5vw;
`;

const StaticStatus = styled.h1`
font-size: 100%;
text-align: center;
color: white;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
font-size: 3vw;
width: 40vw;
display: flex;
flex-direction: column;
// align-items: center;
@media only screen and (max-width: 600px) {
// padding: 15vw;
// background: yellow;
    }
`;

const GameOver = styled.div`
width: 125vw;
height: 55vw;
position: absolute;
top: 0;
right: 0;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
background: rgba(0,0,0,0.8);
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
font-size: 20vw;
flex-direction: column;
margin: 0;
@media only screen and (max-width: 600px) {
  {
    font-size: 10vw;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
    top: 0;
    // background
    // top: 5%;
  }

`;

const ButtonsWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
// margin: 1%;
`
const PlayAgainButton = styled(Button)`
margin-top: -0.5vw;
background: ${props => props.error ? 'grey' : ' '};
cursor: ${props => props.error ? 'not-allowed' : 'pointer'};
border: ${props => props.error ? 'none' : ' '};
&:hover {
  color: ${props => props.error ? 'white' : 'black'};
  background: ${props => props.error ? 'grey' : ' '};
  border: ${props => props.error ? 'none' : ' '};
  box-shadow: ${props => props.error ? 'inset 0 0.1rem 1.5rem lightgrey' : ' '};
}
@media only screen and (max-width: 600px)
{
height: 5.5vw;
width: 20vw;
}
`