import React, { useContext } from "react";
import styled from "styled-components";
import { BsContext } from "../stateManager/stateManager";
import TopBar from "./TopBar"
import UserGrid from "./UserGrid"
import OpponentGrid from "./OpponentGrid"
import Footer from "./Footer"
import Input from "./Input"
import Sockets from "../sockets/socket-client-side"
import Confetti from 'react-confetti'
import Chat from "./Chat"


function App() {
  
  const { winning } = useContext(BsContext);
  
  return (
    <>
      {winning ? <Confetti width='2000px' height='2000px' style={{ zIndex: 1000 }} /> : ' '}
      <Sockets />
      <TopBar />
      <GameWrapper>
        <Input />
        <UserGrid />
        <OpponentGrid />
      </GameWrapper>
      <Chat/>
      <Footer />
    </>
  );
}
export default App;
const GameWrapper = styled.div`
display: flex;
align-items: center;
align-content: center;
justify-content: center;
// width: 1000px;
// height: 1000px;
// margin-top: 15rem;
// border: 1px solid red;
// background: yellow;
`;
