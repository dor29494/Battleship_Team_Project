import React, { createContext, useState, useEffect } from "react";
import { place_ships, initial_game_board, initial_ships } from "../logic/logic";
import io from 'socket.io-client';
import { nanoid } from "nanoid";
const { REACT_APP_SERVER_URL } = process.env;

export const socket = io(REACT_APP_SERVER_URL);
export const HORIZONTAL = 'horizontal'
export const VERTICAL = 'vertical';
export const RUSSIAN = 'RUSSIAN';
export const FRENCH = 'FRENCH';
export const MISS = 'MISS';
export const HIT = 'HIT';
export const SEA = 'SEA';
export const SINK = 'SINK';
export const SHIP_PART = 'SHIP_PART';
export const AROUND_SHIP = 'AROUND_SHIP';
export const AROUND_SINK = 'AROUND_SINK';

const BsContext = createContext(socket);
const { Provider } = BsContext;

const StateManager = ({ children }) => {

  const [playerRoom, setPlayerRoom] = useState(nanoid(4));
  const [bothPlayersConnected, setBothPlayersConnected] = useState(null);
  const [playerBoard, setPlayerBoard] = useState([]);
  const [otherPlayerBoard, setOtherPlayerBoard] = useState(initial_game_board());
  const [playerShips, setPlayerShips] = useState(null);
  const [otherPlayerShips, setOtherPlayerShips] = useState();
  const [firstTurn, setFirstTurn] = useState(null);
  const [randomBoard, setRandomBoard] = useState(false);
  const [playerIsReady, setPlayerIsReady] = useState(false);
  const [bothPlayersReady, setBothPlayersReady] = useState(false);
  const [noteStatus, setNoteStatus] = useState();
  const [gameStatus, setGameStatus] = useState('Welcome');
  const [userPrecents, setUserPrecents] = useState(0);
  const [opponentsPrecents, setOpponentsPrecents] = useState(0);
  const [playerGuess, setPlayerGuess] = useState(null);
  const [otherPlayerGuess, setOtherPlayerGuess] = useState(null);
  const [playerMessage, setPlayerMessage] = useState([]);
  const [otherPlayerMessage, setOtherPlayerMessage] = useState([]);
  const [chatMessage, setChatMessage] = useState([]);
  const [playerID, setPlayerID] = useState(nanoid(5));
  const [lockOtherPlayerBoard, setLockOtherPlayerBoard] = useState(true);
  const [winning, setWinning] = useState(null);
  const [gameOverMsg, setGameOverMsg] = useState(null);
  const [showDcModal, setShowDcModal] = useState(false);
  const [otherPlayerReady, setOtherPlayerReady] = useState(false);
  const [showReadyBox, setShowReadyBox] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playAgain, setPlayeAgain] = useState(false);
  const [usersCounter, setUsersCounter] = useState(1);
  const [leave, setLeave] = useState(false);
  const [playAgainMsg, setPlayAgainMsg] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  useEffect(() => {
    let { board, ships } = place_ships(initial_game_board(), initial_ships());
    setPlayerShips(ships);
    setPlayerBoard(board);
  }, [randomBoard]);

  const state = {
    playerRoom,
    bothPlayersConnected,
    playerBoard,
    otherPlayerBoard,
    playerShips,
    otherPlayerShips,
    firstTurn,
    randomBoard,
    playerIsReady,
    bothPlayersReady,
    noteStatus,
    gameStatus,
    userPrecents,
    opponentsPrecents,
    playerGuess,
    otherPlayerGuess,
    playerMessage,
    otherPlayerMessage,
    chatMessage,
    playerID,
    lockOtherPlayerBoard,
    winning,
    gameOverMsg,
    showDcModal,
    otherPlayerReady,
    showReadyBox,
    connected,
    showStartButton,
    gameStarted,
    playAgain,
    usersCounter,
    leave,
    playAgainMsg,
    mouseX,
    mouseY,
  };
  
  const action = {
    setPlayerRoom,
    setBothPlayersConnected,
    setPlayerBoard,
    setOtherPlayerBoard,
    setPlayerShips,
    setOtherPlayerShips,
    setFirstTurn,
    setRandomBoard,
    setPlayerIsReady,
    setBothPlayersReady,
    setNoteStatus,
    setGameStatus,
    setUserPrecents,
    setOpponentsPrecents,
    setPlayerGuess,
    setOtherPlayerGuess,
    setPlayerMessage,
    setOtherPlayerMessage,
    setChatMessage,
    setPlayerID,
    setLockOtherPlayerBoard,
    setWinning,
    setGameOverMsg,
    setShowDcModal,
    setOtherPlayerReady,
    setShowReadyBox,
    setConnected,
    setShowStartButton,
    setGameStarted,
    setPlayeAgain,
    setUsersCounter,
    setLeave,
    setPlayAgainMsg,
    setMouseX,
    setMouseY,
  };
  
  const ws_connection = {
    socket
  };
  
  return <Provider value={{ ...state, ...action, ...ws_connection }}>{children}</Provider>;
};

export { BsContext, StateManager };


































