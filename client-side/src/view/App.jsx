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

const App = () => {

  const { winning, lockOtherPlayerBoard, bothPlay, show_ready_box } = useContext(BsContext);

  return (
    <AppWrapper>
      <BrowserRouter>
        {winning ? <Confetti width='4000vw' height='2000vw' style={{ zIndex: 1000 }} /> : ' '}
        <Sockets />
        <TopBar />
        <Input />
        <GameWrapper myturn={!lockOtherPlayerBoard}>
          <UserGrid bothPlay={bothPlay} show_ready_box={show_ready_box} />
          <OpponentGrid />
        </GameWrapper>
        <Chat />
        {/* <Footer /> */}

      </BrowserRouter>
    </AppWrapper>



  );
}
export default App;

const GameWrapper = styled.div`

  display: flex;
  padding-top: 10vw;
  @media only screen and (max-width: 600px) {
      padding-top: 6vw;

    }

  }

`;
const AppWrapper = styled.div`
position: relative;
`