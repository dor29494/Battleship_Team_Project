import React, { useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import TopBar from "./TopBar";
import UserGrid from "./UserGrid";
import OpponentGrid from "./OpponentGrid";
import Footer from "./Footer";
import Input from "./Input";
import Sockets from "../sockets/socket-client-side";
import Confetti from 'react-confetti';
import styled from "styled-components";
import { flex, position } from "../styles/Mixins";


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
      <Input />
      <GameWrapper>
        <UserGrid />
        <OpponentGrid />
      </GameWrapper>
      <Footer />
    </>
  );
}
export default App;

const GameWrapper = styled.div`
  ${flex()};
  ${position('absolute', '5%', false, "50%", "50%" )};
`;
