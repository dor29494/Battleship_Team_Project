import React, { useState, useContext, useEffect } from "react";
import styled from 'styled-components'
import { BsContext } from "../stateManager/stateManager";
import { update_board_hit, update_board_miss } from "../logic/logic";
import { SINK, SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import UserPixel from "./UserPixel";
import { GridWrapper, PlayerGrid, GridHeaders, LittleWrapper, LettersBar, NumbersBar, BarPixel } from "../styles/GlobalStyles";
import ProgressBar from '@ramonak/react-progress-bar';

const UserGrid = () => {
  const {
    playerBoard,
    setPlayerBoard,
    playerShips,
    playerIsReady,
    userPrecents,
    setUserPrecents,
    otherPlayerGuess,
    bothPlayersConnected,
    lockOtherPlayerBoard,
    bothPlayersReady
  } = useContext(BsContext)

  // *** for reordering ships functionality (Not implemented yet)
  const [lock_ship_position, set_lock_ship_position] = useState(false);

  // *** lock the user's ship when ready after reordering (Not implemented yet)
  useEffect(() => {
    set_lock_ship_position(true)
  }, [playerIsReady])

  // *** we are reusing this pure function in OpponentGrid - worth moving to Logic.
  // return the player's guess result (hit, miss...)
  const pixelStatus = (x, y, board, ships) => {
    const pixel = board[x][y];
    if (ships && pixel.value === SHIP_PART) {
      return ships[pixel.ship_index].is_sunk ? SINK : pixel.is_hit ? HIT : pixel.value;
    }
    return pixel.value;
  }

  // updating the player's board according to the other player's guess
  useEffect(() => {
    if (otherPlayerGuess) {
      const { result, x, y } = otherPlayerGuess;
      let updated;
      if (result === MISS) {
        updated = update_board_miss(playerBoard, x, y);
        setPlayerBoard(updated)
      } else if (result === HIT) {
        setUserPrecents(userPrecents + 1);
        updated = update_board_hit(x, y, playerBoard[x][y].ship_index, playerBoard, playerShips)
        // *** need checking out
        setPlayerBoard(updated.board);
        // setPlayerShips(updated.ships);
      }
    }
  }, [otherPlayerGuess])

  return (
    <UserGridWrapper bothPlayersConnected={bothPlayersConnected} myturn={lockOtherPlayerBoard} bothPlayersReady={bothPlayersReady}>
      <GridHeaders>Your Grid</GridHeaders>
      <LittleWrapper>
        <ProgressBar bgcolor="#00FF41" labelColor="grey" completed={userPrecents * 5 || 0} width={'30vw'} height={'2vw'} labelSize={'2vw'} />
      </LittleWrapper>
      <NumbersBar>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => <BarPixel key={i}>{num}</BarPixel>)}</NumbersBar>
      <LettersBar>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter, i) => <BarPixel key={i}>{letter}</BarPixel>)}</LettersBar>
      <PlayerGrid>
        {playerBoard.map((xArr, Xindex, board) =>
          xArr.map((yArr, Yindex) =>
            <UserPixel
              lock={lock_ship_position} // *** for the ship reordering function (Not implemented yet)
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex, board, playerShips)}
            ></UserPixel>))}
      </PlayerGrid>
    </UserGridWrapper>
  )
};
const UserGridWrapper = styled(GridWrapper)`
@media only screen and (max-width: 600px) {
  {
  margin: ${props => props.myturn ? '3vw;' : '0' };
  zoom: ${props => props.myturn ? '65%' : '35%' };
  border:  ${props => props.myturn ? 'none' : '1px solid white' };
  ${({bothPlayersConnected, bothPlayersReady }) => bothPlayersConnected && !bothPlayersReady ? `position: absolute; top: 50vw` : ' ' } 

  }

`
export default UserGrid;