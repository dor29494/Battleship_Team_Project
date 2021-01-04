import React, { createContext, useState, useEffect } from "react";
import { place_ships, initial_game_board, initial_ships } from "../view/guy";
import io from 'socket.io-client';

// *** we still need to make the url dynamic.
// import { SOCKET_URL } from "dotenv";

const BsContext = createContext(socket);
const { Provider } = BsContext;

export const socket = io('ws://localhost:3000');
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

const StateManager = ({ children }) => {

  const [player_room, set_player_room] = useState(null);
  const [player_board, set_player_board] = useState([]);
  const [other_player_board, set_other_player_board] = useState(initial_game_board());
  const [player_ships, set_player_ships] = useState(initial_ships());
  const [other_player_ships,set_other_player_ships] = useState();
  const [first_turn, set_first_turn] = useState(null);
  const [player_guess, set_player_guess] = useState(null);
  const [other_player_guess,set_other_player_guess] = useState(null);
  const [player_is_ready, set_player_is_ready] = useState(false);
  const [both_players_ready, set_both_players_ready] = useState(false);
  const [winning, set_winning] = useState(null);

  // *** check with guy if we can make this better.
  useEffect(() => {
    let { board, ships  } = place_ships(initial_game_board(),player_ships);
    set_player_ships(ships);
    set_player_board(board);
  }, []);

  const state = {
    player_room,
    player_board,
    other_player_board,
    player_ships,
    other_player_ships,
    first_turn,
    player_guess,
    other_player_guess,
    player_is_ready,
    both_players_ready,
    winning
  };

  const action = {
    set_player_room,
    set_player_board,
    set_other_player_board,
    set_player_ships,
    set_other_player_ships,
    set_first_turn,
    set_player_guess,
    set_other_player_guess,
    set_player_is_ready,
    set_both_players_ready,
    set_winning
  };

  const ws_connection = {
    socket
  };

  return <Provider value={{ ...state, ...action, ...ws_connection }}>{children}</Provider>;
};

export { BsContext, StateManager };


































