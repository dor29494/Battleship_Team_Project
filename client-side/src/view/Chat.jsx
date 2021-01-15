import React, { useContext, useEffect, useRef, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { flash } from "react-animations";

const flashAnimation = keyframes`${flash}`;

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
  const [show_chat, set_show_chat] = useState(false);
  const [input_msg, set_input_msg] = useState("");
  const [msg_alert, set_msg_alert] = useState(false);
  const chatWrapperRef = useRef(null);
  const refToLast = useRef(false);

  useEffect(() => {
    set_msg_alert(true);
    if (chat_array_message.length >= 1) {
      window.location = "#end";
      if (show_chat) {
        refToLast.current.focus();
      }
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
  };
  const chatShower = () => {
    console.log('toggle')
    set_show_chat(!show_chat);
  };
  // useEffect(() => {
  //   console.log('show chat useeffect')
  //   if (show_chat) {
  //     set_msg_alert(false);
  //   }
  // }, [show_chat]);

  return show_chat ? (
    <>
      <ShowChatButton msg_alert={msg_alert} conClick={chatShower}>
        Close chat
      </ShowChatButton>
      <Wrapper>
        <form style={{ width: "100%" }} onSubmit={submitMessage}>
          <label>
            <ChatWrapper>
              {chat_array_message.length > 0
                ? chat_array_message.map((message, i) => (
                    <MessageHolder
                      key={i}
                      ref={chatWrapperRef}
                      id={chat_array_message.length}
                    >
                      <UserNameHolder>{message.id}: </UserNameHolder>{" "}
                      {message.msg}
                    </MessageHolder>
                  ))
                : ""}
              <h1 id={"end"}></h1>
              <InputHolder
                type="text"
                onChange={messageHandler}
                onKeyPress={messageHandler}
                ref={refToLast}
                placeholder={"Write your message here..."}
              ></InputHolder>
            </ChatWrapper>
          </label>
        </form>
      </Wrapper>
    </>
  ) : (
    <ShowChatButton onClick={chatShower}>Show chat</ShowChatButton>
  
  );
};
export default Chat;
const Wrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  min-height: 15rem;
  max-width: 35rem;
  flex-direction: row;
  align-items: flex-end;
  color: white;
  border-radius: 0.8rem;
  border: 0.1rem solid lightgrey;
`;
const ChatWrapper = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  max-height: 15rem;
  width: 100%;
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
    background: #5f5f5f;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: green;
  }
  background-color: #000000;
`;

const InputHolder = styled.input`
  max-height: 1.7rem;
  width: 30rem;
  align-self: flex-end;
  margin-top: 0.3rem;
  margin-right: 1.2rem;
  outline: none;
  border-radius: 0.2rem;
  font-size: 1rem;
  transition: border 0.5s;
  padding: 1rem;
  z-index: 1;
  margin-bottom: 0.6rem;
  &:focus {
    border: white 2px solid;
  }
`;
const MessageHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 4rem;
  max-width: 20rem;
  outline: none;
  color: white;
  // border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;
  font-size: 1.2rem;
  font-family: sans-serif;
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
`;

const UserNameHolder = styled.div`
  color: #0175f7;
  font-size: 1.2rem;
  margin-right: 0.4rem;
  text-decoration: underline;
  font-family: sans-serif;
`;
const ShowChatButton = styled.button`
font-size: 2rem;
// animation: ${({ msg_alert }) => msg_alert ? '1s ${flashAnimation}' : 'none'}
// animation-iteration-count: ${({ msg_alert }) => msg_alert ? 'infinite' : 'none'} ;

`
