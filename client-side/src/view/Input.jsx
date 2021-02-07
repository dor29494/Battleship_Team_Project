import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsContext } from "../stateManager/stateManager";
import { MdContentCopy } from 'react-icons/md';
import { flex, position } from "../styles/Mixins";
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
  const { setConnected, setPlayerRoom, setShowReadyBox, setShowStartButton } = useContext(BsContext);
  let game_id = props.match.params.id;
  setShowReadyBox(true);
  setConnected(true);
  setPlayerRoom(game_id);
  setShowStartButton(false);

  return <h1></h1>
}
const Input = () => {

  const {
    playerRoom,
    showStartButton,
    bothPlayersConnected,
    otherPlayerShips,
    playerIsReady,
    setPlayerIsReady,
    bothPlayersReady,
    lockOtherPlayerBoard,
    randomBoard,
    setRandomBoard,
    gameStatus,
    setGameStatus,
    winning,
    noteStatus,
    setNoteStatus,
    gameOverMsg,
    showReadyBox,
    setShowReadyBox,
    setBothPlayersReady,
    setGameStarted,
    gameStarted,
    setPlayAgain,
    leave,
    playAgainMsg,
    setMouseX,
    setMouseY,
    setGameOverMsg
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
    setMouseX(event.screenX);
    setMouseY(event.screenY);
    navigator.clipboard.writeText(window.location.origin + "/" + room_id).then(function () {
      setNoteStatus("Id copied to clipboard!");
    });
  }

  // nullify the note after every use
  useEffect(() => {
    setTimeout(() => {
      setNoteStatus('');
    }, 2000);
  }, [noteStatus]);


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
    setPlayerIsReady(true);
    setShowReadyBox(false);
  };

  // set the board randomly
  const RandomBoard = () => {
    setRandomBoard(!randomBoard)
  }

  // set the game status message
  useEffect(() => {
    // if (play_again) return false;
    if (otherPlayerShips && !playerIsReady) {
      setGameStatus('Your opponent is ready!');
      set_waiting(false);
      return false;
    }
    if (showStartButton) { setGameStatus("Please copy the room ID and send it to your friend, Then press start.") }
    if (playerIsReady && !otherPlayerShips) {
      setGameStatus("Waiting for your opponent to be ready...");
      setShowReadyBox(false);
      set_waiting(true);
      return false;
    }
    if (showReadyBox && !bothPlayersConnected) {
      setGameStatus("You are connected! Waiting for another player to connect...");
      set_waiting(true);
    }
    if (playerIsReady && otherPlayerShips) {
      set_waiting(false);
      setGameStatus("You are good to go! Good luck!");
      setShowReadyBox(false);
      setTimeout(() => {
        setGameStarted(true);
        setBothPlayersReady(true);
      }
        , 2000);
      return false;
    }
    if (!lockOtherPlayerBoard && gameStarted) { setGameStatus("Its your turn") }
    else if (lockOtherPlayerBoard && gameStarted) { setGameStatus('') }
    else if (showReadyBox && bothPlayersConnected) { setGameStatus("You are both connected! Please set your board. then press ready.") }
  }, [showStartButton, showReadyBox, bothPlayersConnected, playerIsReady, otherPlayerShips, bothPlayersReady, lockOtherPlayerBoard]);

  // set the game over message according to the player status (winning / losing)
  useEffect(() => {
    if (winning === true) {
      setGameOverMsg('YOU WON!!!');
    }
    else if (winning === false) {
      setGameOverMsg('You lose')
    }
  }, [winning]);

  // reload the page 
  const newGame = () => {
    location.reload();
  }

  // render the suitable buttons and inputs according to the player choices
  const renderDecideder = () => {

    if (showStartButton) {
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
    else if (showReadyBox && bothPlayersConnected) {
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
      setPlayAgain(true);
      location.reload();
    }
  }
  return (
    <>
      <FadeoutStatus />
      <InputWrapper connected={playerRoom} bothPlayersConnected={bothPlayersConnected} gameOverMsg={gameOverMsg} gameStarted={gameStarted}>
        {!gameOverMsg ?
          <MiniWrapper bothPlayersConnected={bothPlayersConnected}>
            <StaticStatus>{gameStatus}
              {waiting ? <Loader type="Grid" color="white" height={'5vw'} width={'5vw'} style={{ margin: "1vw" }} /> : ' '}
            </StaticStatus>
            {renderDecideder()}
          </MiniWrapper>
          : <GameOver>{gameOverMsg}<Button onClick={() => location.href = window.location.origin}>New Game!</Button><PlayAgainButton error={leave} onClick={() => PlayAgain()}>{playAgainMsg ? <Flash>Play Again!</Flash> : 'Play Again!'}</PlayAgainButton></GameOver>}
      </InputWrapper>
      <Switch>
        <Route path='/:id' component={startGame} />
      </Switch>
    </>
  );
}
export default Input;

const InputWrapper = styled.div`
  ${({ gameStarted, gameOverMsg, connected }) => gameStarted && !gameOverMsg ? 'display: none' : connected ? flex('center', false) : flex()};
  position: absolute;
  top: 12vw;
  right: 3vw;
  z-index: 100;
  height: 70vw;
  width: 125vw;
  justify-content: center;
  background: rgba(0,0,0,0.8);
  @media only screen and (max-width: 600px)
  {
    width: 100%;
    background: rgba(0,0,0,0.8);
    opacity: 1;
    height: 90%;
    margin-top: 6vw;
    left: 0;
    ${({bothPlayersConnected }) => bothPlayersConnected ? `width: 80vw; top: 7vw; margin-left: -19vw;` : ' ' };
  }
`;

const MiniWrapper = styled.form`
  display: flex;
  flex-direction: column;
  // ${({ connected }) => connected ? `height: 50%; width: 100%;` : `height: 50%; width: 35%;`};
  border: 3px solid #7fcdfe;
  -webkit-box-shadow: 2px 3px 16px 5px #7fcdff; 
  box-shadow: 2px 3px 16px 5px #7fcdff;
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
height: 80vw;
${({bothPlayersConnected }) => bothPlayersConnected ? `position: absolute; left: 8vw; top: 8vw;` : ' ' };
  }
`;


const CopyButton = styled.button`
  font-size: 100%;
  ${position('relative', false, false, false, '85%')};

    &:hover {
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
    width: 68vw;
    left: 18vw;
    height: 90%;
    top: 10vw;
    background: black;
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