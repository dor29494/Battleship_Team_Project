import React, { useContext } from "react";
import styled from "styled-components";
import { BsContext } from "../stateManager/stateManager";
import TopBar from "./TopBar"
import UserGrid from "./UserGrid"
import OpponentGrid from "./OpponentGrid"
import Footer from "./Footer"
import Input from "./Input"
import { Button } from "../styles/GlobalStyles"

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function App() {
  const { winning } = useContext(BsContext);
  document.addEventListener("mouseover", function () {
    console.log(event.target.ref)
  });
  return (
    <>
      {winning ? <Confetti width='2000px' height='2000px' style={{ zIndex: 1000 }} /> : ' '}
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
margin-top: 15rem;
`;

// const ShapedBackground = styled.div`
// background: #06bcfb;
// background-image: linear-gradient(315deg, #06bcfb 0%, #4884ee 74%);
// height: 900px;
// position: fixed;
// border: 1px solid red;
// border-radius: 50%;
// `;


