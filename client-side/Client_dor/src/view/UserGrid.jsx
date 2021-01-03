import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { BsContext } from "../stateManager/stateManager"
import { update_board_hit, update_board_miss } from "./guy";

const Pixel = (props) => {
  let properties = props;
  // return <h1>none</h1>
  if (properties.status === 'SEA') {
    return (
      <Regularsquare></Regularsquare>
    )
  }
  else if (properties.status === 'MISS') {
    // return <Misshit>▪️</Misshit>
    return <Misshit>MISS</Misshit>
  }
  else if (properties.status === 'HIT' || properties.status === 'SINK') {
    return <Shiphit>X</Shiphit>
  }
  else if (properties.status === 'AROUND_SINK') {
    // return <Misshit>▪️</Misshit>
    return <AroundSink>•</AroundSink>
  }
  else {
    return <Shippart></Shippart>
  }
}
let is_locked;
export const lockGrid = (toggle) => {
  is_locked = !toggle
}


const UserGrid = () => {
  const { grid_array, player_board, opponents_guess, SHIPS, set_player_board, set_SHIPS, set_other_player_board, set_other_player_ships, set_grid_array, grid_clicks, player_guess, set_player_guess, set_is_ready, is_ready } = useContext(BsContext)
  // const [abc_store, set_abc_store] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
  // const [num_store, set_num_store] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [lock, set_lock] = useState(false);
  const [lockArray, set_lockArray] = useState([]);

  const pixelStatus = (x, y) => {
    let obj = grid_array[x][y].value
    // return obj.toString();
    return obj;
  }

  useEffect(() => {
    if (opponents_guess) {
      const { result, x, y } = opponents_guess;
      let updated;
      if (result === "MISS") {
        updated = update_board_miss(player_board, x, y);
        set_player_board(updated)
      } else if (result === "HIT") {
        updated = update_board_hit(x, y, player_board[x][y].ship_index, player_board, SHIPS)
        // *** need checking out
         set_player_board(updated.board);
         console.log("shipssssssssssss: ",updated.ships);
        // set_SHIPS(updated.ships);
      }
    }
  }, [opponents_guess])

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
        {grid_array.map((xArr, Xindex) => xArr.map((yArr, Yindex) => <Pixel lock={lock} key={`g${Yindex}`} status={pixelStatus(Xindex, Yindex)}></Pixel>))}
      </Grid>
    </Wrapper>
  )
}
export default UserGrid

const StyledPixel = styled.div`
min-width: 2rem;
min-height: 2rem;
width: 50px;
height: 50px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border: 1px solid #00FF41;
if (props.status === 'SEA') { return background: blue }
`
const Grid = styled.div`
display: flex;
flex-wrap: wrap;
height: 500px;
width: 500px;
color: #003B00;

`
const Wrapper = styled(Grid)`
border: none;
color: white;
`
const AbcWrapper = styled.div`
border: 2px solid black;
min-height: 2rem;
width: 500px;
display: flex;

`
const NumWrapper = styled.div`
// border: 1px solid white;
width: 50px;
height: 500px;
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
position: absolute;  
left: 230px;
top: 310px;
`
const AbcDiv = styled.div`
flex-basis: 10%;
height: 50px;
width: 50px;
// border: 1px solid white;
display: flex;
justify-content: center;
align-items: center;

`
const NumDiv = styled.div`
flex-basis: 10%;
height: 50px;
margin-left: 5px;
// border: 1px solid white;
display: flex;
justify-content: center;
width: 50px;

`








const Regularsquare = styled.div`
  border: 1px solid;
  border-color: #00FF41;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Misshit = styled.div`
background: #00FF41;
opacity: 0.3;
border: 3px solid #00FF41;
display: flex;
  align-items: center;
  justify-content: center;
width: 50px;
height: 50px;
`;

const AroundSink = styled(Misshit)`
background: red;
`;

const Invlidmove = styled.div`
  border: 1px solid;
  color: grey;
  border-color: lightblue;
  background: rgba(224, 224, 224.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;
const Shiphit = styled.div`
  border: 1px solid;
  color: red;
  font-size: 5vh;
  border-color: lightblue;
  background: rgba(255, 153, 153, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const Shippart = styled.div`
  border: 3px solid blue;
//   background-color: lightgray;
width: 50px;
height: 50px;
  cursor: move;
`;

const Resetgrid = styled.button`
  border: 1px solid;
  background-color: white;
  color: blue;
  min-width: 6vh;
  min-height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Randomgrid = styled.button`
  border: 1px solid;
  background-color: white;
  color: blue;
  min-width: 6vh;
  min-height: 6vh;
  cursor: pointer;
`;
const Playbtn = styled.button`
  border: 1px solid #d6d6d6;
  padding :.2em .8em ; 
  background-color: linear-gradient(to bottom,rgba(225,250,225,1) 0,rgba(195,222,197,1) 100%);
  color:blue;
  cursor : pointer ;
  box-shadow : 0 2px 6px rgba(0,0,0,.25)
  width: 10vh;
  height:6vh;
`;
