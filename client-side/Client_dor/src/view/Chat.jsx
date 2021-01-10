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
    <Wrapper>
      <form onSubmit={submitMessage}>
        <label>
          <InputHolder
            type="text"
            onChange={messageHandler}
            onKeyPress={messageHandler}
            ref={refToLast}
          ></InputHolder>
          <ChatWrapper>
            {chat_array_message.length > 0
              ? chat_array_message.map((message, i) => (
                  <MessageHolder
                    key={i}
                    ref={chatWrapperRef}
                    id={chat_array_message.length}
                  >
                   {message.id}: {message.msg}
                  </MessageHolder>
                ))
              : ""}
            <h1 id={"end"}></h1>
          </ChatWrapper>
        </label>
      </form>
    </Wrapper>
  );
};
export default Chat;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 20rem;
  align-items: center;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
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
  margin-bottom: 0.6rem;

  &:focus {
    border: tomato 2px solid;
  }
`;
const MessageHolder = styled.div`
  height: 4rem;
  width: 45rem;
  outline: none;
  border-radius: 4rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;

  &:focus {
    border: tomato 2px solid;
  }
`;
const formHolder = styled.form``;
