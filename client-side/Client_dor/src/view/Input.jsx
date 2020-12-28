import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { play_button, join_button, ready_button } from "../sockets/socket-client-side";

const Input = (props) => {
  const [room_id, set_room_id] = useState('');
  const inputEl = useRef();
  return (
    <MiniWrapper>
      <PlayButton onClick={() => set_room_id(play_button())}>Play</PlayButton>
      <UrlHolder>{room_id}</UrlHolder>
      <JoinButton onClick={() => join_button(inputEl.current.value)}>Join</JoinButton>
      <InputHolder ref={inputEl} />
      <ReadyButton onClick={() => ready_button()}>Ready</ReadyButton>
    </MiniWrapper>
  )
}

export default Input;

const MiniWrapper = styled.form`
display:flex;
flex-direction: column;
// border: 2px black solid;
height: 100%;
justify-content: space-around;
`
const UrlHolder = styled.div`
height: 4rem;
width: 45rem;
outline: none;
border-radius: 4rem;
border: white 2px solid;
transition: border 0.5s;
padding: 1rem;
z-index: 1;

&:focus {
  border: tomato 2px solid;
}
`
const ReadyButton = styled.div`
font-family: "Expletus Sans";
text-align: left;
font-size: 2rem;
width: 20rem;
height: 3rem;
text-align: center;
border-radius: 3rem;
font-weight: 400;
color: black;
background: white;
border: none;
box-shadow: inset 0 0.1rem 1.5rem lightgrey;
cursor: pointer;
&:focus{
 outline: none;
 box-shadow: 0px 0px yellow, -1em 0 04em white;
}
`;


const InputHolder = styled.input`
  height: 4rem;
  width: 20rem;
  outline: none;
  border-radius: 4rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;
 z-index: 1;

  &:focus {
    border: tomato 2px solid;
  }
  margin-bottom: 0.6rem;
`;
const JoinButton = styled.div`
display: ${inputValue => inputValue ? 'flex' : 'none'}
font-family: "Expletus Sans";
text-align: left;
font-size: 2rem;
width: 20rem;
max-height: 7rem;
text-align: center;
border-radius: 3rem;
font-weight: 400;
color: black;
background: white;
border: none;
box-shadow: inset 0 0.1rem 1.5rem lightgrey;
cursor: pointer;
&:focus{
 outline: none;
 box-shadow: 0px 0px yellow, -1em 0 04em white;
}
margin-bottom: 0.6rem;
`;
