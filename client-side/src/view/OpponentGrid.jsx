import React, { useContext, useEffect, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import { inspect_hit, update_board_hit, update_board_miss } from "../logic/logic";
import { SINK, SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import { Wrapper, OtherPlayerGrid, GridHeaders } from "../styles/GlobalStyles";
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
    set_winning
  } = useContext(BsContext);

  // const [abc_store, set_abc_store] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
  // const [num_store, set_num_store] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const [lock_other_player_board, set_lock_other_player_board] = useState(true);
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

  // *** we are reusing this in UserGrid - worth cheking.
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
    if (!lock) { // *** to check with eli if needed.
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
    } else {
      console.log("Its not your turn! (locked grid)");
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
    <Wrapper>
      <GridHeaders>Opponents Grid</GridHeaders>
      {/* הורדנו את החרא הזה, זה פה למי שרוצה להחזיר */}
      {/* <NumWrapper>
            {num_store.map(num => <NumDiv>{num}</NumDiv>)}
          </NumWrapper>
          <AbcWrapper>
            {abc_store.map(abc => <AbcDiv>{abc}</AbcDiv>)}
          </AbcWrapper> */}
      <OtherPlayerGrid lock={lock_other_player_board}>
        {other_player_board.map((xArr, Xindex, board) =>
          xArr.map((yArr, Yindex) => (
            <OpponentPixel
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
    </Wrapper>
  );
};

export default OpponentGrid;

// const styledPixel = styled.div`
//   min-width: 2rem;
//   min-height: 2rem;
//   width: 50px;
//   height: 50px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border: 1px solid #00ff41;
// `;

// const AbcWrapper = styled.div`
//   border: 2px solid black;
//   min-height: 2rem;
//   width: 500px;
//   display: flex;
// `;

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

//Ship-Part-Style
// border: 1px solid;
// border-color: #00FF41;
// width: 50px;
// height: 50px;
// :hover {
//   background: #00FF41;
//   opacity: 0.5;
// }
// display: flex;
// justify-content: center;
// align-items: center;

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

// const Randomgrid = styled.button`
//   border: 1px solid;
//   background-color: white;
//   color: blue;
//   min-width: 6vh;
//   min-height: 6vh;
//   cursor: pointer;
// `;

// const Playbtn = styled.button`
// border: 1px solid #d6d6d6;
// padding :.2em .8em ; 
// background-color: linear-gradient(to bottom,rgba(225,250,225,1) 0,rgba(195,222,197,1) 100%);
// color:blue;
// cursor : pointer ;
// box-shadow : 0 2px 6px rgba(0,0,0,.25)
// width: 10vh;
// height:6vh;
// `;
