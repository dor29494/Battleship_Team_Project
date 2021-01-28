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
        {winning ? <Confetti width='2000vw' height='1000vw' style={{ zIndex: 1000 }} /> : ' '}
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
  flex-direction: ${props => props.myturn ? 'column-reverse' : 'column'};
  // flex-direction: column-reverse;
  padding-top: 10vw;
  @media only screen and (min-width: 600px) {
      flex-direction: row;
      padding-top: 0;

    }

  }

`;
const AppWrapper = styled.div`
position: relative;
`