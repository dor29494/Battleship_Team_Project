import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar"
import UserGrid from "./UserGrid"
import OpponentGrid from "./OpponentGrid"
import Footer from "./Footer"
import Input from "./Input"

function App() {

  return (
    <>
      <TopBar />
      <GameWrapper>
        <Input/>
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
justify-content: space-between;
max-width: 800px
border: 3px solid;
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