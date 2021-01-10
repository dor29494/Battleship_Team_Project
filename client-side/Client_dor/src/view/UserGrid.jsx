import React, { useContext, useEffect } from "react";
import { BsContext } from "../stateManager/stateManager";
import { update_board_hit, update_board_miss } from "./guy";
import { SHIP_PART, HIT, MISS } from "../stateManager/stateManager";
import styled from "styled-components";
import UserPixel from "./UserPixel";
import Chat from "./Chat"

const UserGrid = () => {
  const { 
    player_board,
    set_player_board,
    player_ships,
    other_player_guess
  } = useContext(BsContext)

  // const [abc_store, set_abc_store] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
  // const [num_store, set_num_store] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  // *** i dont think we need this
  //#region 
  // const [lock, set_lock] = useState(false);
  // const [lockArray, set_lockArray] = useState([]);
  //#endregion

  const pixelStatus = (x, y) => {
    let obj = player_board[x][y].value;
    if (obj === SHIP_PART && player_board[x][y].is_hit === true) {
      return HIT
    }
    return obj;
  }

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

    // *** i dont think we need this
    //#region 
  // const ClickHandler = (x, y, lock) => {
  //   if (!lock) {
  //     if (!lockedButton(x, y)) {
  //       console.log({ x, y })
  //       set_player_guess({ x, y })
  //       lockButton(x, y)
  //     }
  //     else {
  //       console.log("locked button")
  //     }
  //   }
  //   else { console.log("locked grid!") }
  // }
  // const lockButton = (x, y) => {
  //   let itemLocked = { x, y }
  //   set_lockArray([...lockArray, itemLocked])
  // }
  // const lockedButton = (x, y) => {
  //   let itemLocked = { x, y }
  //   for (let item of lockArray) {
  //     if (item.x === x && item.y === y) return true
  //   }
  //   return false
  // }
  //#endregion
  
  return (
    <Wrapper>Your Grid
      {/* הורדנו את החרא הזה, זה פה למי שרוצה להחזיר */}
      {/* <NumWrapper>
        {num_store.map(num => <NumDiv>{num}</NumDiv>)}
      </NumWrapper>
      <AbcWrapper>
        {abc_store.map(abc => <AbcDiv>{abc}</AbcDiv>)}
      </AbcWrapper> */}
      <Grid>
        {player_board.map((xArr, Xindex) => xArr.map((yArr, Yindex) => <UserPixel 
        // lock={lock} 
        key={`g${Yindex}`} status={pixelStatus(Xindex, Yindex)}></UserPixel>))}
      </Grid>
      <Chat/>
    </Wrapper>
  )
};

export default UserGrid

const Grid = styled.div`
display: flex;
flex-wrap: wrap;
height: 500px;
width: 500px;
color: #003B00;
`;

const Wrapper = styled(Grid)`
border: none;
color: white;
`;

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
