import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsContext } from "../stateManager/stateManager";
import { inspect_hit, update_board_hit, update_board_miss } from "./guy";
// Last update - Yahav

let oppnent_grid = [];
console.log(oppnent_grid);

export const update_oppnent_grid = (bord) => {
  oppnent_grid = bord;
};
const Pixel = (props) => {
  let properties = props;
  // return <h1>none</h1>
  if (properties.status === "SEA") {
    return (
      <Regularsquare
        onClick={() => {
          props.clickhandler(props.x, props.y, props.lock);
        }}
      ></Regularsquare>
    );
  } else if (properties.status === "MISS") {
    // return <Misshit>▪️</Misshit>
    return (
      <Misshit
        onClick={() => {
          props.clickhandler(props.x, props.y, props.lock);
        }}
      >
        MISS
      </Misshit>
    );
  } else if (properties.status === "HIT" || properties.status === "SINK") {
    return (
      <Shiphit
        onClick={() => {
          props.clickhandler(props.x, props.y, props.lock);
        }}
      >
        X
      </Shiphit>
    );
  } else {
    return (
      <Shippart
        onClick={() => {
          props.clickhandler(props.x, props.y, props.lock);
        }}
      ></Shippart>
    );
  }
};
const UserGrid = () => {
  const {
    grid_clicks,
    player_guess,
    set_player_guess,
    other_player_board,
    set_other_player_board,
    other_player_ships,
    set_other_player_ships
  } = useContext(BsContext);
  // const [abc_store, set_abc_store] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
  // const [num_store, set_num_store] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [lock, set_lock] = useState(false);
  const [lockArray, set_lockArray] = useState([]);
  const pixelStatus = (x, y) => {
    let obj = other_player_board[x][y].value;
    // return obj.toString();
    return obj;
  };
  console.log(player_guess);
  const ClickHandler = (x, y, lock) => {
    let updated
    if (!lock) {
      if (!lockedButton(x, y)) {
        console.log({ x, y });
        const result = inspect_hit(other_player_board, x, y);
        console.log(result)
        set_player_guess({ x, y, result });
        if (result === "MISS") {
          console.log('guy func',update_board_miss(other_player_board, x, y))
          updated = update_board_miss(other_player_board, x, y);
          set_other_player_board(updated)
          
        } else if (result === "HIT") {
          console.log(x, y,other_player_board[x][y].ship_index,other_player_board,other_player_ships)
         updated = update_board_hit(x, y,other_player_board[x][y].ship_index,other_player_board,other_player_ships)
        //  console.log('updated console log',updated)

        //  set_other_player_board(updated.board);
        //  set_other_player_ships(updated.ships)
        }
       
        
        
        lockButton(x, y);
      } else {
        console.log("locked button");
      }
    } else {
      console.log("locked grid!");
    }
  };
  const lockButton = (x, y) => {
    let itemLocked = { x, y };
    set_lockArray([...lockArray, itemLocked]);
  };
  const lockedButton = (x, y) => {
    let itemLocked = { x, y };
    for (let item of lockArray) {
      if (item.x === x && item.y === y) return true;
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
      <Grid>
        {console.log('The other player board',other_player_board)}
        {other_player_board.map((xArr, Xindex) =>
          xArr.map((yArr, Yindex) => (
            <Pixel
              lock={lock}
              key={`g${Yindex}`}
              status={pixelStatus(Xindex, Yindex)}
              x={Xindex}
              y={Yindex}
              clickhandler={ClickHandler}
            ></Pixel>
          ))
        )}
      </Grid>
    </Wrapper>
  );
};
export default UserGrid;

const styledPixel = styled.div`
  min-width: 2rem;
  min-height: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #00ff41;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  width: 500px;
  color: #003b00;
`;
const Wrapper = styled(Grid)`
  border: none;
  color: white;
`;
const AbcWrapper = styled.div`
  border: 2px solid black;
  min-height: 2rem;
  width: 500px;
  display: flex;
`;

const Regularsquare = styled.div`
  border: 1px solid;
  border-color: #00ff41;
  width: 50px;
  height: 50px;
  :hover {
    background: #00ff41;
    opacity: 0.5;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Misshit = styled.div`
  background: #00ff41;
  opacity: 0.3;
  border: 3px solid #00ff41;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
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
