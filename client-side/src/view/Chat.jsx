import React, { useContext, useEffect, useRef, useState } from "react";
import { BsContext } from "../stateManager/stateManager";

import styled from "styled-components";

const Chat = () => {
  const {
    player_message,
    set_player_message,
    other_player_message,
    set_other_player_message,
    set_chat_array_message,
    chat_array_message,
    player_id,
  } = useContext(BsContext);
  const toggle = true
  const [input_msg, set_input_msg] = useState("");
  const chatWrapperRef = useRef(null);
  const refToLast = useRef(null);
  console.log(chat_array_message);
  useEffect(() => {
    if (chat_array_message.length >= 1) {
      window.location = "#end";
      refToLast.current.focus();
    }
    console.log("inside of UseEffect with chat_array_message");
  }, [chat_array_message]);
  const messageHandler = (e) => {
    if (e.target.value) {
      set_input_msg(e.target.value);
    }
    if (e.key === "Enter") {
      e.target.value = "";
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();
    console.log("message Submiting");
    set_player_message([...player_message, input_msg]);
    set_chat_array_message([
      ...chat_array_message,
      {
        id: player_id,
        msg: input_msg,
      },
    ]);
    console.log("Chat: ", chat_array_message);
  };
  // console.log('Player msg: ' ,player_message)
  // console.log('Other player msg',other_player_message)
  return (
    <Wrapper toggle={toggle}>
      <form onSubmit={submitMessage}>
        <label>
          <ChatWrapper>
            {chat_array_message.length > 0
              ? chat_array_message.map((message, i) => (
                  <MessageHolder
                    key={i}
                    ref={chatWrapperRef}
                    id={chat_array_message.length}
                  >
                  <UserNameHolder>{message.id}: </UserNameHolder> {message.msg}
                  </MessageHolder>
                ))
              : ""}
            <h1 id={"end"}></h1>
            <InputWrapper>
            <InputHolder
            type="text"
            onChange={messageHandler}
            onKeyPress={messageHandler}
            ref={refToLast}
            placeholder={'Write your message here...'}
          ></InputHolder>
          </InputWrapper>
          </ChatWrapper>
       
        </label>
      </form>
    </Wrapper>
  );
};
export default Chat;
const Wrapper = styled.div`
  display: ${({toggle}) => toggle ? 'flex' : 'none'};
  margin-top: 2rem;
  flex-direction: row;
  align-items: center;
  color: white;
  border-radius: 0.8rem;
  border: 0.1rem solid lightgrey;
`;
const ChatWrapper = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  max-height: 20rem;
  min-width: 50rem;
  align-items: center;
  margin-top: 2rem;
  margin-right: 2rem;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #5F5F5F; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
  background-color: #000000;
  // border: 2px solid red;
`;

const InputHolder = styled.input`
  height: 4rem;
  min-width: 45rem;
  outline: none;
  border-radius: 1rem;
  font-size: 1.9rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;
  z-index: 1;
  margin-bottom: 0.6rem;
  &:focus {
    border: tomato 2px solid;
  }
`;
const MessageHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 4rem;
  width: 45rem;
  outline: none;
  color: white;
  // border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;
  font-size: 2.3rem;
  font-family:sans-serif;
  background: #000000;
  opacity: 70%;
  flex-basis: 20%;
  // &:focus {
  //   border: tomato 2px solid;
  // }
  // &:nth-child(even) {
  //   background: #3B3EDB;
  // }
  // &:nth-child(odd) {
  //   background: white;
  // }
  `
const InputWrapper = styled.div`
  display: flex
  `
const UserNameHolder = styled.div`
  color: #0175F7;
  font-size: 2.3rem;
  margin-right: 0.4rem;
  text-decoration: underline;
  font-family:sans-serif;
  `

const formHolder = styled.form``;
