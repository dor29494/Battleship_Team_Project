import React, { useState, useContext, useEffect } from "react";
import { BsContext } from "../stateManager/stateManager";
import { update_board_hit, update_board_miss } from "../logic/logic";
import { SINK, SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import { Wrapper, PlayerGrid, GridHeaders, LettersBar, NumbersBar, BarPixel } from "../styles/GlobalStyles";
import UserPixel from "./UserPixel";

const UserGrid = () => {
  const {
    player_board,
    set_player_board,
    player_ships,
    other_player_guess,
    player_is_ready
  } = useContext(BsContext)

  // *** for reordering ships functionality
  const [lock_ship_position, set_lock_ship_position] = useState(false);

  // *** lock the user's ship when ready after reordering
  useEffect(() => {
    set_lock_ship_position(true)
  }, [player_is_ready])

  // *** we are reusing this pure function in OpponentGrid - worth moving to Logic.
  // return the player's guess result (hit, miss...)
  const pixelStatus = (x, y, board, ships) => {
    const pixel = board[x][y];
    if (ships && pixel.value === SHIP_PART) {
      return ships[pixel.ship_index].is_sunk ? SINK : pixel.is_hit ? HIT : pixel.value;
    }
    return pixel.value;
  }

  // updating the player's board and lock it.
  useEffect(() => {
    if (other_player_guess) {
      const { result, x, y } = other_player_guess;
      let updated;
      if (result === MISS) {
        updated = update_board_miss(player_board, x, y);
        set_player_board(updated)
      } else if (result === HIT) {
        updated = update_board_hit(x, y, player_board[x][y].ship_index, player_board, player_ships)
        // *** need checking out
        set_player_board(updated.board);
        // set_player_ships(updated.ships);
      }
    }
  }, [other_player_guess])

  return (
    <Wrapper>
      <GridHeaders>Your Grid</GridHeaders>
      <NumbersBar>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num,i) => <BarPixel key={i}>{num}</BarPixel>)}</NumbersBar>
      <LettersBar>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter,i) => <BarPixel key={i}>{letter}</BarPixel>)}</LettersBar>
      <PlayerGrid>
        {player_board.map((xArr, Xindex, board) =>
          xArr.map((yArr, Yindex) =>
            <UserPixel
              lock={lock_ship_position} // *** for the ship reordering function.
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex, board, player_ships)}
            ></UserPixel>))}
      </PlayerGrid>
    </Wrapper>
  )
};

export default UserGrid;

//*** need checking with eli + dor

// const Invlidmove = styled.div`
//   border: 1px solid;
//   color: grey;
//   border-color: lightblue;
//   background: rgba(224, 224, 224.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 50px;
//   height: 50px;
// `;

// const Resetgrid = styled.button`
//   border: 1px solid;
//   background-color: white;
//   color: blue;
//   min-width: 6vh;
//   min-height: 6vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// `;

