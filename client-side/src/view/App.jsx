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
import { BrowserRouter } from 'react-router-dom';

function App() {

  const { winning } = useContext(BsContext);

  return (
    <BrowserRouter>

      {winning ? <Confetti width='1800vw' height='980vw' style={{ zIndex: 1000 }} /> : ' '}
      <Sockets />
      <TopBar />
      <Input />
      <GameWrapper>
        <UserGrid />
        <OpponentGrid />
      </GameWrapper>
      <Chat />
      <Footer />

    </BrowserRouter>

  );
}
export default App;

const GameWrapper = styled.div`
  // ${flex()};
  display: flex;
  // ${position('absolute', '-5%', false, "50%", "50%" )};

`;











