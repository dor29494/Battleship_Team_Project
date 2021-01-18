import React, { useContext, useEffect, useRef, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { flex, position } from "../styles/Mixins";
import { flash } from "react-animations"; //

const flashAnimation = keyframes`${flash}`; // 

const Chat = () => {
  const {
    player_message,
    set_player_message,
    chat_array_message,
    set_chat_array_message,
    player_id,
  } = useContext(BsContext);

  // local states:
  const [show_chat, set_show_chat] = useState(false);
  const [input_msg, set_input_msg] = useState("");
  const [msg_alert, set_msg_alert] = useState(false);
  const chatWrapperRef = useRef(null); //
  const refToLast = useRef(false);
  
  const chatShower = () => {
    // console.log('toggle')
    set_show_chat(!show_chat);
  };

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
    // console.log("message Submiting");
    set_player_message([...player_message, input_msg]);
    set_chat_array_message([
      ...chat_array_message,
      {
        id: player_id,
        msg: input_msg,
      },
    ]);
  };

  useEffect(() => {
    set_msg_alert(true);
    if (chat_array_message.length >= 1) {
      window.location = "#end";
      if (show_chat) {
        refToLast.current.focus();
      }
    }
    // console.log("inside of UseEffect with chat_array_message");
  }, [chat_array_message]);


  // useEffect(() => {
  //   console.log('show chat useeffect')
  //   if (show_chat) {
  //     set_msg_alert(false);
  //   }
  // }, [show_chat]);

  return show_chat ? (
    <>
      <ShowChatButton msg_alert={msg_alert} onClick={chatShower}>Close chat</ShowChatButton>
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

const ShowChatButton = styled(Button)`
  ${position('absolute', '98%', false, false, '11%')};
  max-height: 2.5rem;
  max-width: 8rem;
  font-size: 1.6rem;
`;

const Wrapper = styled.div`
  ${position('absolute', '83%', false, false, '20%')};
  ${flex('flex-end')};
  flex-direction: row;
  min-height: 15rem;
  max-width: 35rem;
  border: 0.1rem solid lightblue;
  border-radius: 0.8rem;
  color: white;
  background: #000000;
  margin-top: 2rem;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
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
`;

const InputHolder = styled.input`
  align-self: flex-end;
  max-height: 1.7rem;
  width: 30rem;
  border-radius: 0.2rem;
  font-size: 1rem;
  margin-top: 0.3rem;
  margin-bottom: 0.6rem;
  margin-right: 1.2rem;
  padding: 1rem;
  outline: none;
  transition: border 0.5s;

    &:focus {
      border: white 2px solid;
    }
`;

const MessageHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 20%;
  height: 4rem;
  max-width: 20rem;
  color: white;
  font-family: sans-serif;
  font-size: 1.2rem;
  padding: 1rem;
  outline: none;
  transition: border 0.5s;
  opacity: 70%;

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
  font-family: sans-serif;
  font-size: 1.2rem;
  text-decoration: underline;
  margin-right: 0.4rem;
`;

// animation: ${({ msg_alert }) => msg_alert ? '1s ${flashAnimation}' : 'none'}
// animation-iteration-count: ${({ msg_alert }) => msg_alert ? 'infinite' : 'none'} ;


