import React, { useContext, useEffect, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import { inspect_hit, update_board_hit, update_board_miss } from "../logic/logic";
import { SINK, SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import { GridWrapper, OtherPlayerGrid, GridHeaders, LettersBar, NumbersBar, BarPixel } from "../styles/GlobalStyles";
import OpponentPixel from "./OpponentPixel";

const OpponentGrid = () => {
  const {
    other_player_board,
    set_other_player_board,
    other_player_ships,
    set_player_guess,
    other_player_guess,
    both_players_ready,
    first_turn,
    set_winning,
    lock_other_player_board,
    set_lock_other_player_board
  } = useContext(BsContext);

  const [lockArray, set_lockArray] = useState([]);

  // unlock the board of the first player.
  useEffect(() => {
    if (first_turn) { set_lock_other_player_board(false) }
  }, [both_players_ready]);

  // unlock the players board if the other player missed.
  useEffect(() => {
    if (other_player_guess) {
      const { result } = other_player_guess;
      if (result === MISS) { set_lock_other_player_board(false) }
    }
  }, [other_player_guess]);

  // *** we are reusing this pure function in UserGrid - worth moving to Logic.
  // return the player's guess result (hit, miss...)
  const pixelStatus = (x, y, board, ships) => {
    const pixel = board[x][y];
    if (ships && pixel.value === SHIP_PART) {
      return ships[pixel.ship_index].is_sunk ? SINK : pixel.is_hit ? HIT : pixel.value;
    }
    return pixel.value;
  }

  // lock the used pixels.
  const onClick = (x, y, lock) => {
    let updated;
    if (lock) { 
      console.log("Its not your turn! (locked grid)");
    } else {
      if (!locked_pixels_arr(x, y)) {
        // checking the guess's result and emit it to the other player.
        const result = inspect_hit(other_player_board, x, y);
        set_player_guess({ x, y, result });
        // in the same time updating the player's opponent board and lock it.
        if (result === MISS) {
          updated = update_board_miss(other_player_board, x, y);
          set_other_player_board(updated)
          set_lock_other_player_board(true);
        } else if (result === HIT) {
          // console.log(x, y, other_player_board[x][y].ship_index, other_player_board, other_player_ships)
          updated = update_board_hit(x, y, other_player_board[x][y].ship_index, other_player_board, other_player_ships)
          if (updated.is_win) {
            set_winning(true);
            set_lock_other_player_board(true);
          };
          //  set_other_player_board(updated.board);
          //  set_other_player_ships(updated.ships);
        }
        lock_Pixel(x, y);
      } else {
        console.log("this pixel has already had been clicked (locked button)");
      }
    }
  };

  const lock_Pixel = (x, y) => {
    let itemLocked = { x, y };
    set_lockArray([...lockArray, itemLocked]);
  };

  const locked_pixels_arr = (x, y) => {
    for (let item of lockArray) {
      if (item.x === x && item.y === y) { return true };
    }
    return false;
  };

  return (
    <GridWrapper>
      <GridHeaders>Opponents Grid</GridHeaders>
      <NumbersBar>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num,i) => <BarPixel key={i}>{num}</BarPixel>)}</NumbersBar>
      <LettersBar>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter,i) => <BarPixel key={i}>{letter}</BarPixel>)}</LettersBar>
      <OtherPlayerGrid lock={lock_other_player_board}>
        {other_player_board.map((xArr, Xindex, board) =>
          xArr.map((yArr, Yindex) => (
            <OpponentPixel
            myturn={!lock_other_player_board}
              lock={lock_other_player_board}
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex, board, other_player_ships)}
              x={Xindex}
              y={Yindex}
              clickhandler={onClick}
            ></OpponentPixel>
          ))
        )}
      </OtherPlayerGrid>
    </GridWrapper>
  );
};

export default OpponentGrid;

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


