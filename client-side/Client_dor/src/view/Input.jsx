import React, { useState } from "react";
import styled from "styled-components";
const Input = () => {
const [room_id,set_room_id] = useState("");
console.log(room_id)
const PlayFunc = ()=>{
 set_room_id(play_button())
}
// input-value
const InputFunc = (room
    )=>{
      console.log(room)
    // join_button(input-value)
}

  return (
   <MiniWrapper>
   <PlayButton onClick={PlayFunc}>Play</PlayButton>
      <UrlHolder>{room_id}</UrlHolder>
      <JoinButton onClick={()=>{InputFunc(room_id)}}>Join</JoinButton>
        <InputHolder/>
        <ReadyButton>Ready</ReadyButton>

 </MiniWrapper>
  )}

export default Input;

const MiniWrapper = styled.div`
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


const PlayButton = styled.button`
  font-family: "Expletus Sans";
  text-align: left;
  font-size: 2rem;
  width: 7rem;
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
`;
const ReadyButton = styled.div`
font-family: "Expletus Sans";
text-align: left;
font-size: 2rem;
width: 15rem;
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
`;
const JoinButton = styled.div` 
font-family: "Expletus Sans";
text-align: left;
font-size: 2rem;
width: 7rem;
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
`;
