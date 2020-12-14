import React, { useState, useEffect } from "react";

const BsContext = React.createContext();
const { Provider } = BsContext;
const MISS = 'MISS';
const HIT = 'HIT';
const SINK = 'SINK';
const AROUND_SINK = 'AROUND_SINK';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal'
const SEA = 'SEA';

const StateManager = ({ children }) => {
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
  const [grid_array, set_grid_array] = useState([
    [
      SEA,
      SHIPS[1].ship_parts[0],
      SHIPS[1].ship_parts[1],
      SHIPS[1].ship_parts[2],
      SEA,
      SEA,
      SEA,
      SEA,
      SEA,
      SEA,
    ],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
  ]);
  const state = {
    first_state,
    SHIPS,
    grid_array,
    grid_clicks,
  };
  const action = {
    set_first_state,
    set_SHIPS,
    set_grid_array,
    set_GridClicks,
  };

  return <Provider value={{ ...state, ...action }}>{children}</Provider>;
};

export { BsContext, StateManager };
