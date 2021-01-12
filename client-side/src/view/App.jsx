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

function App() {
  
  const { winning } = useContext(BsContext);

  // document.addEventListener("mouseover", function () {
  //   console.log(event.target.ref)
  // });

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
      <Footer />
    </>
  );
}
export default App;
const GameWrapper = styled.div`
display: flex;
width: 100%;
height: 100%;
margin-top: 15rem;
`;
