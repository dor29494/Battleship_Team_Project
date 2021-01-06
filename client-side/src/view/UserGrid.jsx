import React, { useState, useContext, useEffect } from "react";
import { BsContext } from "../stateManager/stateManager";
import { update_board_hit, update_board_miss } from "../logic/logic";
import { SINK, SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import { Wrapper, PlayerGrid, GridHeaders } from "../styles/GlobalStyles";
import UserPixel from "./UserPixel";

const UserGrid = () => {
  const {
    player_board,
    set_player_board,
    player_ships,
    other_player_guess,
    player_is_ready
  } = useContext(BsContext)

  // const [abc_store, set_abc_store] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
  // const [num_store, set_num_store] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const [lock_ship_position, set_lock_ship_position] = useState(false);

  // *** lock the user's ship when ready after reordering
  useEffect(() => {
    set_lock_ship_position(true)
  }, [player_is_ready])

  // *** we are reusing this in OpponentGrid - worth cheking.
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
      {/* הורדנו את החרא הזה, זה פה למי שרוצה להחזיר */}
      {/* <NumWrapper>
        {num_store.map(num => <NumDiv>{num}</NumDiv>)}
      </NumWrapper>
      <AbcWrapper>
        {abc_store.map(abc => <AbcDiv>{abc}</AbcDiv>)}
      </AbcWrapper> */}
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

// const StyledPixel = styled.div`
// min-width: 2rem;
// min-height: 2rem;
// width: 50px;
// height: 50px;
// display: flex;
// align-items: center;
// justify-content: center;
// cursor: pointer;
// border: 1px solid #00FF41;
// if (props.status === 'SEA') { return background: blue }
// `
// const AbcWrapper = styled.div`
// border: 2px solid black;
// min-height: 2rem;
// width: 500px;
// display: flex;
// `
// const NumWrapper = styled.div`
// // border: 1px solid white;
// width: 50px;
// height: 500px;
// display: flex;
// flex-direction: column;
// justify-content: center;
// justify-items: center;
// position: absolute;  
// left: 230px;
// top: 310px;
// `
// const AbcDiv = styled.div`
// flex-basis: 10%;
// height: 50px;
// width: 50px;
// // border: 1px solid white;
// display: flex;
// justify-content: center;
// align-items: center;

// `
// const NumDiv = styled.div`
// flex-basis: 10%;
// height: 50px;
// margin-left: 5px;
// // border: 1px solid white;
// display: flex;
// justify-content: center;
// width: 50px;
// `

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

// const Randomgrid = styled.button`
//   border: 1px solid;
//   background-color: white;
//   color: blue;
//   min-width: 6vh;
//   min-height: 6vh;
//   cursor: pointer;
// `;

// const Playbtn = styled.button`
//   border: 1px solid #d6d6d6;
//   padding :.2em .8em ; 
//   background-color: linear-gradient(to bottom,rgba(225,250,225,1) 0,rgba(195,222,197,1) 100%);
//   color:blue;
//   cursor : pointer ;
//   box-shadow : 0 2px 6px rgba(0,0,0,.25)
//   width: 10vh;
//   height:6vh;
// `;
