import React, { useEffect, useState, useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import Modal from "./MsgModal";
import battleship_logo from "../logo/battleship_logo.jpg";
import styled, { keyframes } from "styled-components";
import { flex, position } from "../styles/Mixins";
import { flash } from "react-animations";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const flashAnimation = keyframes`${flash}`;

const TopBar = () => {
  const {
    bothPlayersReady,
    lockOtherPlayerBoard,
    showDcModal,
    gameOverMsg,
    usersCounter,
  } = useContext(BsContext);

  return (
    <TopBarWrapper>
      <LogoWrapper>
        <Logo
          src={battleship_logo}
          alt={"logo"}
          onClick={() => (location.href = window.location.origin)}
        />
      </LogoWrapper>
      <TopBarHeader>
        {usersCounter} {usersCounter > 1 ? "Players" : "Player"} Online
      </TopBarHeader>
      {bothPlayersReady && !gameOverMsg ? (
        <TurnHolder myturn={!lockOtherPlayerBoard}>
          {!lockOtherPlayerBoard ? (
            <TurnText>
              <Flash>Its Your Turn!</Flash>
            </TurnText>
          ) : (
            <TurnText>
              Opponent Turn
              <Loader
                style={{
                  paddingLeft: "0.5vw",
                  position: "relative",
                  top: "1.1vw",
                }}
                type="ThreeDots"
                color="white"
                height={"4vw"}
                width={"4vw"}
              />{" "}
            </TurnText>
          )}
        </TurnHolder>
      ) : (
        " "
      )}
      {showDcModal && !gameOverMsg ? <Modal /> : " "}
    </TopBarWrapper>
  );
};

export default TopBar;

const TopBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  // width: 100vw;
  color: white;
  height: 13vw;
  margin-bottom: -8vw;

  @media only screen and (min-width: 600px) {
     {
      width: 130vw;
      margin-bottom: 0;
    }
  }
`;
const LogoWrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 600px) {
    display: flex;
         }
`;

const Logo = styled.img`
  height: 10vw;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    height: 6vw;
    margin-left: -3vw;
  }

`;

const TopBarHeader = styled.span`
  // ${position("absolute", "105vw", false, false, "4.9%")};
  font-size: 2.5vw;
  width: 100%;
  margin-top: -4vw;
  margin-left: 1.5vw;
  @media only screen and (max-width: 600px) {
    zoom: 50%;

  }
`;

const TurnHolder = styled.div`
  ${flex(false, "center")};
  width: 100%;

  @media only screen and (max-width: 600px) {
    margin: 3vw;
    padding-left: 2vw;
    background: ${(props) => (!props.myturn ? "red" : "blue")};
    display: flex;
    // background: blue;
    align-items: center;
    font-size: 5vw;
    zoom: 50%;
  }
`;

const TurnText = styled.div`
  ${flex(false, false)};
  font-size: 3vw;
  align-items: center;
`;

const Flash = styled.h1`
  animation: 6s ${flashAnimation};
  animation-iteration-count: infinite;
  font-size: 3vw;
`;
