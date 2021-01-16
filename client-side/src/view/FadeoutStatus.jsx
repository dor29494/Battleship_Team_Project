import React, { useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { fadeOut } from 'react-animations';
import { flex, position } from "../styles/Mixins";


const fadeoutAnimation = keyframes`${fadeOut}`;

const FadeoutStatus = () => {
    
    const { note_status } = useContext(BsContext);

    return (
        <StatusBox>{note_status ? <Animated>{note_status}</Animated> : ' '}</StatusBox>
    )
}


export default FadeoutStatus;

const StatusBox = styled.div`
  ${flex()};
  align-self: start;
  ${position('absolute', '40%', false, false, '40.5%')};
  height: 4rem;
  min-width: 20rem;
  font-size: 2rem;
  z-index: 2;
`;

const Animated = styled.h1`
  ${flex(false,false)};
  align-content: center;
  animation: 3s ${fadeoutAnimation};
  font-size: 2rem;
`;