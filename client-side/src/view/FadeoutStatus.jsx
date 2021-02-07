import React, { useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { fadeOut } from 'react-animations';
import { flex, position } from "../styles/Mixins";


const fadeoutAnimation = keyframes`${fadeOut}`;

const FadeoutStatus = () => {

  const { noteStatus, mouseX, mouseY, game_over_msg } = useContext(BsContext);
  if (game_over_msg) return ('');
  return (
    <StatusBox mouseX={mouseX + 350} mouseY={mouseY + 100}> <Animated>{noteStatus}</Animated></StatusBox>
  )

}


export default FadeoutStatus;

const StatusBox = styled.div`
  ${flex()};
  align-self: start;
  position: absolute;
  // height: 4rem;
  // min-width: 20rem;
  font-size: 2rem;
  z-index: 2000000;
  top: ${props => props.mouseY}px;
  left: ${props => props.mouseX}px;
  `;

const Animated = styled.h1`
  ${flex(false, false)};
  align-content: center;
  animation: 3s ${fadeoutAnimation};
  font-size: 2rem;
`;