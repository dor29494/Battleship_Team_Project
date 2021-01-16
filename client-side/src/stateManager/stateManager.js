import React, { createContext, useState, useEffect } from "react";
import { place_ships, initial_game_board, initial_ships } from "../logic/logic";
import io from 'socket.io-client';

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

  const [player_room, set_player_room] = useState(null);
  const [both_players_connected, set_both_players_connected] = useState(null);
  const [player_board, set_player_board] = useState([]);
  const [other_player_board, set_other_player_board] = useState(initial_game_board());
  const [player_ships, set_player_ships] = useState(null);
  const [other_player_ships,set_other_player_ships] = useState();
  const [first_turn, set_first_turn] = useState(null);
  const [random_board, set_random_board] = useState(false);
  const [player_is_ready, set_player_is_ready] = useState(false);
  const [both_players_ready, set_both_players_ready] = useState(false);
  const [note_status, set_note_status] = useState(null);
  const [game_status, set_game_status] = useState('Welcome');
  const [user_precents, set_user_precents] = useState(0);
  const [opponent_precents, set_opponent_precents] = useState(0);
  const [player_guess, set_player_guess] = useState(null);
  const [other_player_guess,set_other_player_guess] = useState(null);
  const [lock_other_player_board, set_lock_other_player_board] = useState(true);
  const [winning, set_winning] = useState(null);
  const [game_over_msg, set_game_over_msg] = useState(null);
  const [show_dc_modal, set_show_dc_modal] = useState(false);

  useEffect(() => {
    let { board, ships } = place_ships(initial_game_board(), initial_ships());
    set_player_ships(ships);
    set_player_board(board);
  }, [random_board]);

  const state = {
    player_room,
    both_players_connected,
    player_board,
    other_player_board,
    player_ships,
    other_player_ships,
    first_turn,
    random_board,
    player_is_ready,
    both_players_ready,
    note_status,
    game_status,
    user_precents,
    opponent_precents,
    player_guess,
    other_player_guess,
    lock_other_player_board,
    winning,
    game_over_msg,
    show_dc_modal
  };
  
  const action = {
    set_player_room,
    set_both_players_connected,
    set_player_board,
    set_other_player_board,
    set_player_ships,
    set_other_player_ships,
    set_first_turn,
    set_random_board,
    set_player_is_ready,
    set_both_players_ready,
    set_note_status,
    set_game_status,
    set_user_precents,
    set_opponent_precents,
    set_player_guess,
    set_other_player_guess,
    set_lock_other_player_board,
    set_winning,
    set_game_over_msg,
    set_show_dc_modal
  };

  const ws_connection = {
    socket
  };

  return <Provider value={{ ...state, ...action, ...ws_connection }}>{children}</Provider>;
};

export { BsContext, StateManager };


































