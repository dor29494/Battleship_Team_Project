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
    otherPlayerBoard,
    setOtherPlayerBoard,
    otherPlayerShips,
    first_turn,
    bothPlayersReady,
    setNoteStatus,
    opponent_precents,
    set_opponent_precents,
    setPlayerGuess,
    otherPlayerGuess,
    lockOtherPlayerBoard,
    setLockOtherPlayerBoard,
    setWinning,
    setMouseX,
    set_mouseY,
    gameStarted
  } = useContext(BsContext);

  const [lockArray, set_lockArray] = useState([]);

  // unlock the board of the first player.
  useEffect(() => {
    if (first_turn) {
      setLockOtherPlayerBoard(false);
    }
    else {
      setLockOtherPlayerBoard(true);
    }
  }, [bothPlayersReady]);

  // unlock the players board if the other player missed.
  useEffect(() => {
    if (otherPlayerGuess) {
      const { result } = otherPlayerGuess;
      if (result === MISS) {
        setLockOtherPlayerBoard(false);
      }
    }
  }, [otherPlayerGuess]);

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
    setMouseX(event.screenX);
    set_mouseY(event.screenY);
    let updated;
    if (lock) {
      setNoteStatus("Its not your turn!");
    } else {
      if (!locked_pixels_arr(x, y)) {
        const result = inspect_hit(otherPlayerBoard, x, y);
        setPlayerGuess({ x, y, result });
        if (result === MISS) {
          updated = update_board_miss(otherPlayerBoard, x, y);
          setOtherPlayerBoard(updated)
          setLockOtherPlayerBoard(true);
          setTimeout(() => {
            setNoteStatus('MISS');
          }, 100);
        } else if (result === HIT) {
          // console.log(x, y, otherPlayerBoard[x][y].ship_index, otherPlayerBoard, otherPlayerShips)
          updated = update_board_hit(x, y, otherPlayerBoard[x][y].ship_index, otherPlayerBoard, otherPlayerShips)
          // console.log(updated)
          if (updated.sunk) {
            setNoteStatus('SINK!')
            // NOT WORKING!!
          }
          else {
            setNoteStatus('HIT!');
            set_opponent_precents((opponent_precents + 1));
          }
          if (updated.is_win) {
            setWinning(true);
            setLockOtherPlayerBoard(true);
          };
          //  setOtherPlayerBoard(updated.board);
        }
        lock_Pixel(x, y);
      } else {
        setNoteStatus('Already clicked!')
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
    <OpponentGridWrapper myturn={!lockOtherPlayerBoard} gameStarted={gameStarted}>
      <GridHeaders>Opponents Grid</GridHeaders>
      <LittleWrapper>
        <ProgressBar bgcolor="#00FF41" labelColor="grey" completed={opponent_precents * 5 || 0} width={'30vw'} height={'2vw'} labelSize={'2vw'} />
      </LittleWrapper>
      <NumbersBar>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => <BarPixel key={i}>{num}</BarPixel>)}</NumbersBar>
      <LettersBar>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter, i) => <BarPixel key={i}>{letter}</BarPixel>)}</LettersBar>
      <OtherPlayerGrid lockOtherPlayerBoard={lockOtherPlayerBoard}>
        {otherPlayerBoard.map((xArr, Xindex, board) =>
          xArr.map((yArr, Yindex) => (
            <OpponentPixel
              lock={lockOtherPlayerBoard}
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex, board, otherPlayerShips)}
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
  display: ${props => props.gameStarted ? 'grid' : 'none' };
  `