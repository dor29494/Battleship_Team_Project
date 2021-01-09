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