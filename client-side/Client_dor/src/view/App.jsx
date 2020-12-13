import React, { useContext } from "react";
import styled from "styled-components";
import TopBar from "./TopBar"
import UserGrid from "./UserGrid"
import OppnentGrid from "./OppnentGrid"
import {BsContext} from "../stateManager/stateManager"
function App() {
  const {first_state,ships_array,grid_array,set_ships_array,set_grid_array} = useContext(BsContext);
console.log(first_state)
console.log(grid_array.length)
  return (
    <>
    <TopBar/>
    <GameWrapper>
<UserGrid/>
<OppnentGrid/>
    </GameWrapper>
    </>
  );
}
export default App;

const GameWrapper = styled.div`
margin-top: 9rem;
border: 2px solid white;
min-width: 120rem;
min-height: 42rem;
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
grid-auto-rows: minmax(100px, auto);
justify-items: auto;

`
