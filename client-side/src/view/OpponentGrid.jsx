import React, { useContext, useEffect, useState, useRef } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled from 'styled-components'
import { inspect_hit, update_board_hit, update_board_miss } from "../logic/logic";
import { SINK, SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import OpponentPixel from "./OpponentPixel";
import { GridWrapper, OtherPlayerGrid, GridHeaders, LittleWrapper, LettersBar, NumbersBar, BarPixel } from "../styles/GlobalStyles";
import ProgressBar from '@ramonak/react-progress-bar';


const OpponentGrid = () => {
  const {
    other_player_board,
    set_other_player_board,
    other_player_ships,
    first_turn,
    both_players_ready,
    set_note_status,
    opponent_precents,
    set_opponent_precents,
    set_player_guess,
    other_player_guess,
    lock_other_player_board,
    set_lock_other_player_board,
    set_winning,
    set_mouseX,
    set_mouseY,
    game_started
  } = useContext(BsContext);

  const [lockArray, set_lockArray] = useState([]);

  // unlock the board of the first player.
  useEffect(() => {
    if (first_turn) {
      set_lock_other_player_board(false);
    }
    else {
      set_lock_other_player_board(true);
    }
  }, [both_players_ready]);

  // unlock the players board if the other player missed.
  useEffect(() => {
    if (other_player_guess) {
      const { result } = other_player_guess;
      if (result === MISS) {
        set_lock_other_player_board(false);
      }
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

  // checking the guess's result and emit it to the other player
  // in the same time updating the player's opponent board and lock it
  // afterwards lock the used pixel
  const onClick = (x, y, lock) => {
    set_mouseX(event.screenX);
    set_mouseY(event.screenY);
    let updated;
    if (lock) {
      set_note_status("Its not your turn!");
    } else {
      if (!locked_pixels_arr(x, y)) {
        const result = inspect_hit(other_player_board, x, y);
        set_player_guess({ x, y, result });
        if (result === MISS) {
          updated = update_board_miss(other_player_board, x, y);
          set_other_player_board(updated)
          set_lock_other_player_board(true);
          setTimeout(() => {
            set_note_status('MISS');
          }, 100);
        } else if (result === HIT) {
          // console.log(x, y, other_player_board[x][y].ship_index, other_player_board, other_player_ships)
          updated = update_board_hit(x, y, other_player_board[x][y].ship_index, other_player_board, other_player_ships)
          // console.log(updated)
          if (updated.sunk) {
            set_note_status('SINK!')
            // NOT WORKING!!
          }
          else {
            set_note_status('HIT!');
            set_opponent_precents((opponent_precents + 1));
          }
          if (updated.is_win) {
            set_winning(true);
            set_lock_other_player_board(true);
          };
          //  set_other_player_board(updated.board);
          //  set_other_player_ships(updated.ships);
        }
        lock_Pixel(x, y);
      } else {
        set_note_status('Already clicked!')
      }
    }
    event.stopPropagation();
  }

  // lock a specific pixel
  const lock_Pixel = (x, y) => {
    let itemLocked = { x, y };
    set_lockArray([...lockArray, itemLocked]);
  };

  // save all the locked pixels in an array for later checking
  const locked_pixels_arr = (x, y) => {
    for (let item of lockArray) {
      if (item.x === x && item.y === y) { return true };
    }
    return false;
  };

  return (
    <OpponentGridWrapper myturn={!lock_other_player_board} game_started={game_started}>
      <GridHeaders>Opponents Grid</GridHeaders>
      <LittleWrapper>
        <ProgressBar bgcolor="#00FF41" labelColor="grey" completed={opponent_precents * 5 || 0} width={'30vw'} height={'2vw'} labelSize={'2vw'} />
      </LittleWrapper>
      <NumbersBar>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => <BarPixel key={i}>{num}</BarPixel>)}</NumbersBar>
      <LettersBar>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter, i) => <BarPixel key={i}>{letter}</BarPixel>)}</LettersBar>
      <OtherPlayerGrid lock_other_player_board={lock_other_player_board}>
        {other_player_board.map((xArr, Xindex, board) =>
          xArr.map((yArr, Yindex) => (
            <OpponentPixel
              lock={lock_other_player_board}
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex, board, other_player_ships)}
              x={Xindex}
              y={Yindex}
              clickhandler={onClick}>
            </OpponentPixel>
          ))
        )}
      </OtherPlayerGrid>
    </OpponentGridWrapper>
  );
};

export default OpponentGrid;



const OpponentGridWrapper = styled(GridWrapper)`
@media only screen and (max-width: 600px) {
  {
    display: ${props => props.myturn ? 'grid' : 'none'}
    
  }
  display: ${props => props.game_started ? 'grid' : 'none' };
  `