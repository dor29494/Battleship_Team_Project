import React, { useContext, useEffect, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import { inspect_hit, update_board_hit, update_board_miss } from "./guy";
import { SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import styled from "styled-components";
import OppnentPixel from "./OppnentPixel";

const OppnentGrid = () => {
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

  const [lock_board, set_lock_board] = useState(true);
  const [lockArray, set_lockArray] = useState([]);

  // unlock the board of the first player.
  useEffect(() => {
    if (first_turn) { set_lock_board(false) }
  }, [both_players_ready]);

  // unlock the players board if the other player missed.
  useEffect(() => {
    if (other_player_guess) {
      const { result } = other_player_guess;
      if (result === MISS) { set_lock_board(false) }
    }
  }, [other_player_guess]);

  // return the playe's guess result (hit, miss...)
  const pixelStatus = (x, y) => {
    const obj = other_player_board[x][y].value;
    if (obj === SHIP_PART && other_player_board[x][y].is_hit === true) {
      return HIT
    }
    return obj;
  };

  const onClick = (x, y, lock) => {
    let updated;
    if (!lock) {
      if (!locked_pixels(x, y)) {
        const result = inspect_hit(other_player_board, x, y);
        set_player_guess({ x, y, result });
        if (result === MISS) {
          updated = update_board_miss(other_player_board, x, y);
          set_other_player_board(updated)
          set_lock_board(true);

        } else if (result === HIT) {
          // console.log(x, y, other_player_board[x][y].ship_index, other_player_board, other_player_ships)
          updated = update_board_hit(x, y, other_player_board[x][y].ship_index, other_player_board, other_player_ships)
          if (updated.is_win) { 
            set_winning(true);
            set_lock_board(true);
          };
          //  set_other_player_board(updated.board);
          //  set_other_player_ships(updated.ships);
        }

        lock_Button(x, y);
      } else {
        console.log("this pixel has already had been clicked (locked button)");
      }
    } else {
      console.log("Its not your turn! (locked grid)");
    }
  };
  const lock_Button = (x, y) => {
    let itemLocked = { x, y };
    set_lockArray([...lockArray, itemLocked]);
  };

  const locked_pixels = (x, y) => {
    for (let item of lockArray) {
      if (item.x === x && item.y === y) { return true };
    }
    return false;
  };

  return (
    <Wrapper>
      Opponents Grid
      {/* הורדנו את החרא הזה, זה פה למי שרוצה להחזיר */}
      {/* <NumWrapper>
            {num_store.map(num => <NumDiv>{num}</NumDiv>)}
          </NumWrapper>
          <AbcWrapper>
            {abc_store.map(abc => <AbcDiv>{abc}</AbcDiv>)}
          </AbcWrapper> */}
      <Grid lock={lock_board}>
        {/* {console.log('The other player board',other_player_board)} */}
        {other_player_board.map((xArr, Xindex) =>
          xArr.map((yArr, Yindex) => (
            <OppnentPixel
              lock={lock_board}
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex)}
              x={Xindex}
              y={Yindex}
              clickhandler={onClick}
            ></OppnentPixel>
          ))
        )}
      </Grid>
    </Wrapper>
  );
};

export default OppnentGrid;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  width: 500px;
  color: #003b00;
  cursor-pointer: ${({ lock_board }) => (lock_board ? 'none' : 'auto')};

`;

const Wrapper = styled(Grid)`
  border: none;
  color: white;
`;

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
