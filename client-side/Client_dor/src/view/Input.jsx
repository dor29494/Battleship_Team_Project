import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import { play_button, join_button, ready_button, player_guess } from '../sockets/socket-client-side'
const Input = (props) => {
  const [room_id, set_room_id] = useState('');
  const [inputValue, set_inputValue] = useState('');
  const [show_button, set_show_button] = useState(false)
  const [Button_name, set_Button_name] = useState('Host Game')
  useEffect(() => { 
    setTimeout(() => {
      set_inputValue(props.socket.current.id);
    }, 1000);
  }, [])
  const PlayFunc = () => {
    console.log("PLAY BUTTON ", play_button())
    set_room_id(play_button())
  }
  // input-value
  const inputEl = useRef();
  
  const InputFunc = () => {
    join_button(inputEl.current.value)
  }
const submitFunc = (inputEl) => {
  console.log("SUBMIT WITH THIS ROOM: ", inputEl.value)
  
}
const Put_input_on_state = (currentValue) => {
if(currentValue.length > 0){
  set_Button_name('Join')
}if(currentValue.length === 0){
  set_Button_name('Host Game')
}
set_inputValue(currentValue)
}
  return (
    <MiniWrapper onSubmit={() => submitFunc(inputEl)}>
      <JoinButton onClick={() => props.sendChat(props.socket, inputEl.current.value) }>{Button_name}</JoinButton>
      <InputHolder value={inputValue} ref={inputEl} onChange={() => Put_input_on_state(inputEl.current.value)} />
      <ReadyButton>Ready</ReadyButton>
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
