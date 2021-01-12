import React, { useContext, useRef, useEffect, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { fadeOut } from 'react-animations';
import { ProgressBar } from 'react-bootstrap';


const fadeoutAnimation = keyframes`${fadeOut}`;

const FadeoutStatus = () => {
    const {
        status,
        set_status
    } = useContext(BsContext);
    return (
        <StatusBox status={status}>{status ? <Animated>{status}</Animated> : ' '}</StatusBox>
    )
}






export default FadeoutStatus;

const StatusBox = styled.div`
width: 50rem;
height: 4rem;
display: flex;
align-items: center;
justify-content: center;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
position: absolute;
right: 33%;
top: 25%;
z-index: 1000;
`
const Animated = styled.h1`
font-size: 2rem;
animation: 3s ${fadeoutAnimation};
display: flex;
align-content: center;
`