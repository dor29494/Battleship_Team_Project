import React, { useState, useEffect } from "react";
import { place_ships, initial_game_board, initial_ships } from "../view/guy";
import io from 'socket.io-client';
// import { SOCKET_URL } from "dotenv";

export const socket = io('ws://localhost:3000');
const BsContext = React.createContext(socket);
const { Provider } = BsContext;
const MISS = 'MISS';
const HIT = 'HIT';
const SINK = 'SINK';
const AROUND_SINK = 'AROUND_SINK';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal'
const SEA = 'SEA';
const SHIP_PART = 'SHIP_PART';


const StateManager = ({ children }) => {
  // ------------------------------ws states------------------------------
  const [player_room, set_player_room] = useState(null);
  const [player_board, set_player_board] = useState(null);
  const [other_player_board, set_other_player_board] = useState(initial_game_board());
  const [other_player_ships,set_other_player_ships] = useState();
  const [first_turn, set_first_turn] = useState(null);
  const [player_guess, set_player_guess] = useState(null);
  const [opponents_guess,set_opponents_guess] = useState(null);
  const [is_ready, set_is_ready] = useState(false);
  // ------------------------------ws states------------------------------

  const [first_state, set_first_state] = useState("hello");
  const [SHIPS, set_SHIPS] = useState(initial_ships());
  const [grid_clicks, set_GridClicks] = useState({});
  const [grid_array, set_grid_array] = useState([]);

  useEffect(() => {
    let { board, ships  } = place_ships(initial_game_board(),SHIPS);
    set_SHIPS(ships)
    set_grid_array(board)
  }, [])

  const state = {
    // ws states
    player_room,
    player_board,
    other_player_board,
    other_player_ships,
    first_turn,
    player_guess,
    opponents_guess,
    is_ready,
    // ws states
    first_state,
    SHIPS,
    grid_array,
    grid_clicks
  };
  const action = {
    // ws actions
    set_player_room,
    set_player_board,
    set_other_player_board,
    set_other_player_ships,
    set_first_turn,
    set_player_guess,
    set_opponents_guess,
    set_is_ready,
    // ws actions
    set_first_state,
    set_SHIPS,
    set_grid_array,
    set_GridClicks
  };

  const ws_connection = {
    socket
  };

  useEffect(() => {
    set_player_board(grid_array);
  },[grid_array]);

  return <Provider value={{ ...state, ...action, ...ws_connection }}>{children}</Provider>;
};

export { BsContext, StateManager };


































