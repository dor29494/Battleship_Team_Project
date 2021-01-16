import React, { useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import Sockets from "../sockets/socket-client-side";
import TopBar from "./TopBar";
import Input from "./Input";
import UserGrid from "./UserGrid";
import OpponentGrid from "./OpponentGrid";
import Chat from "./Chat"
import Footer from "./Footer";
import styled from "styled-components";
import { flex, position } from "../styles/Mixins";
import Confetti from 'react-confetti';


function App() {

  const { winning } = useContext(BsContext);
  
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
      <Chat/>
      <Footer />
    </>
  );
}
export default App;

const GameWrapper = styled.div`
  ${flex()};
  ${position('absolute', '5%', false, "50%", "50%" )};
`;
