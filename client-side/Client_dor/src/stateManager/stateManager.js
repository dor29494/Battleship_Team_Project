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
  const [other_player_board, set_other_player_board] = useState(null);
  const [first_turn, set_first_turn] = useState(null);
  const [guess, set_guess] = useState(null);
  // ------------------------------ws states------------------------------

  useEffect(() => {
    let { board: test } = place_ships(initial_game_board(), initial_ships());
    // console.log("TEST: ", test)
    set_grid_array(test)
  }, [])
  const [first_state, set_first_state] = useState("hello");
  const [SHIPS, set_SHIPS] = useState(
    [
      {
        name: "S1",
        length: 3,
        ship_parts: [
          {
            ship_name: "S1",
            x: 2,
            y: 1,
            is_hit: false,
          },
          {
            ship_name: "S1",
            x: 2,
            y: 2,
            is_hit: false,
          },
          {
            ship_name: "S1",
            x: 2,
            y: 3,
            is_hit: false,
          },
        ],
        direction: VERTICAL,
      },
      {
        name: "S2",
        ship_parts: [
          {
            ship_name: "S2",
            x: 0,
            y: 1,
            is_hit: false,
          },
          {
            ship_name: "S2",
            x: 0,
            y: 2,
            is_hit: false,
          },
          {
            ship_name: "S2",
            x: 0,
            y: 3,
            is_hit: false,
          },
        ],
        length: 3,
        direction: HORIZONTAL,
        is_sunk: false,
      },
    ]
  );
  const [grid_clicks, set_GridClicks] = useState({});
  const [grid_array, set_grid_array] = useState([]);
  const state = {
    // ws states
    player_room,
    player_board,
    other_player_board,
    first_turn,
    guess,
    // ws states
    first_state,
    SHIPS,
    grid_array,
    grid_clicks,
  };
  const action = {
    // ws actions
    set_player_room,
    set_player_board,
    set_other_player_board,
    set_first_turn,
    set_guess,
    // ws actions
    set_first_state,
    set_SHIPS,
    set_grid_array,
    set_GridClicks,
  };

  const ws_connection = {
    socket
  };

  useEffect(() => {
    set_player_board(grid_array);
  },[grid_array]);

  //------------------------------------------ws------------------------------------------

  // set the connection to the server.
  // const socket = io('ws://localhost:3000');
  // socket.emit("data", { message: "player is connected" }); // test
  
  // onclick (on the grid)
  // checking with the other_player_board if bulzai and send result to the server.
  // const player_guess = (player_guess) => {
  //   socket.emit("data", { room: player_room, guess: player_guess });
  //   // if guess = miss => locking the grid.
  // }

  


  return <Provider value={{ ...state, ...action, ...ws_connection }}>{children}</Provider>;
};

export { BsContext, StateManager };


































