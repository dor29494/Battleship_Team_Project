import React, { useContext, useEffect, useRef, useState } from "react";
import { BsContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { Button } from "../styles/GlobalStyles";
import { flex, position } from "../styles/Mixins";
import { flash } from "react-animations"; //
import { FaCommentDots, FaPaperPlane } from "react-icons/fa";

const flashAnimation = keyframes`${flash}`; //

const Chat = () => {
  const {
    player_message,
    set_player_message,
    chat_array_message,
    set_chat_array_message,
    player_id,
    other_player_message,
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

  // set what is shown in the chat input
  const messageHandler = (e) => {
    if (e.target.value) {
      set_input_msg(e.target.value);
    }
    if (e.key === "Enter") {
      e.target.value = "";
    }
  };

  // add the new message to the chat
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
setTimeout(() => {
  
  refToLast.current.focus();
}, 60);
  };

  // keep the chat scrolling down all the time
  useEffect(() => {
    if (chat_array_message.length >= 1) {
      window.location = "#end";
    }
    // console.log("inside of UseEffect with chat_array_message");
  }, [chat_array_message]);

  useEffect(() => {
    console.log("other_player_message useeffect");
    if (other_player_message.length >= 1) {
      if (!show_chat) {
        set_msg_alert(true);
      } else {
        set_msg_alert(false);
      }
    }
  }, [other_player_message]);

  useEffect(() => {
    if (show_chat) {
      set_msg_alert(false);
      refToLast.current.focus();
    }
  }, [show_chat]);

  return show_chat ? (
    <>
      <ShowChatButton msg_alert={msg_alert} onClick={chatShower}>
        <FaCommentDots />
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
                      <UserNameHolder message={message} player_id={player_id}>{(message.id === player_id) ? 'You' : 'Oppnent'}: </UserNameHolder>{" "}
                      {message.msg}
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
                  placeholder={"Write your message here..."}
                ></InputHolder>
                <FaPaperPlaneBox
                  style={SendButtonStyleObj}
                  onClick={submitMessage}
                />
              </InputWrapper>
            </ChatWrapper>
          </label>
        </form>
      </Wrapper>
    </>
  ) : (
    <>
      <ShowChatButton onClick={chatShower}>
        {msg_alert && !show_chat ? (
          <Flash>
            {" "}
            <FaCommentDots style={{ color: "#FA3E3E", marginTop: "20%" }} />
          </Flash>
        ) : (
          <FaCommentDots />
        )}
      </ShowChatButton>
    </>
  );
};

export default Chat;

const SendButtonStyleObj = {
  order: "1",
  alignSelf: "center",
  marginBottom: "0.6rem",
  transform: "rotate(15deg)",
  cursor: "pointer",
};
const ShowChatButton = styled(Button)`
  ${position("relative", "0%", false, false, "0%")};
  ${({ msg_alert, show_chat }) =>
    msg_alert && !show_chat ? flex("flex-end", "stretch") : flex()}
    align-self: flex-end;
  text-align: center;
  max-height: 2.5rem;
  max-width: 2.5rem;
  font-size: 1.6rem;
  //   msg_alert && !show_chat ? flex("flex-end", "stretch") : flex()}
  // text-align: center;
  // z-index: 10;
  // max-height: 3.5vw;
  // max-width: 3.5vw;
  // font-size: 2.5vw;
  // background: rgba(0, 0, 255, 0.3);
  // border: 0.2vh solid #c0c0c0

  box-shadow: ${({ msg_alert, show_chat }) =>
    msg_alert && !show_chat ? "none" : "inset 0 0.2rem 1.5rem #5880CE"};
  &:focus {
    outline: none;
    box-shadow: 0px 0px black, -1em 0 04em white;
  }
  &:hover {
    -webkit-box-shadow: 2px 3px 16px 5px rgba(0, 128, 128, 128);
    // box-shadow: 2px 3px 16px 5px rgba(0,128,128,128);
    background: #696969;
    color: white;
  }
  @media only screen and (max-width: 600px)
  {
width: 7vw;
height: 7vw;
  }
`;

const Wrapper = styled.div`
position: relative;
top: -20vw;
left: 6vw;
z-index: 100;
${flex("flex-end")};
  align-self: flex-end;
  max-width: 33vw;
  flex-wrap: wrap;
  flex-direction: row;
  border: 0.1rem solid lightblue;
  min-height: 12vw;
  border-radius: 0.8rem;
  color: white;
  background: #000000;
  opacity: 80%;
  margin-top: 2rem;
  @media only screen and (max-width: 600px)
    {
      top: -32vw;
      left: 8vw;
      height: 20vw;
    }
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // border: 2px solid red;
  max-width: 32.7vw;
  max-height: 15vw;
  border-radius: 0.5rem;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  // background: red;
  ::-webkit-scrollbar {
    width: 1.5vw;
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
  padding: 0vw;
  @media only screen and (max-width: 600px)
  {
    max-height: 19vw;
  }
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const InputHolder = styled.input`
  align-self: flex-end;
  height: 1.7vw;
  flex-basis: 80%;
  min-width: 26vw;
  border-radius: 25px;
  font-size: 1.5vw;
  margin: 1vw;
  margin-right: 0;
  position: relative;
  right: 0vw;
  top: 0.5vw;
  bottom: 0;
  padding: 1vw;
  outline: none;
  border: none;
  transition: border 0.5s;

  &:focus {
    // border: white 1px solid;
  }
  @media only screen and (max-width: 600px)
  {
    height: 3vw;
  }
`;

const MessageHolder = styled.div`
  padding: 2vw;
  max-height: 4vw;
  padding-left: 2vw;
  display: flex;
  flex-basis: 20%;
  color: white;
  font-family: sans-serif;
  font-size: 1.5vw;
  padding-bottom: 0;
  outline: none;
  transition: border 0.5s;
  margin: -1vw;
  // word-wrap    : break-word;
  // overflow-wrap: break-word;
  // background: yellow;
  @media only screen and (max-width: 600px)
  {
    font-size: 2.2vw;
    // margin-top: 0.005vw;
    margin-bottom: 0.05vw;
  }


`;

const UserNameHolder = styled.div`
  color: ${({message,player_id})=> message.id === player_id ? '#0175f7' : '#ff1515'}  ;
  font-family: sans-serif;
  font-size: 1.7vw;
  // text-decoration: underline;
  margin-right: 0.4rem;
  @media only screen and (max-width: 600px)
  {
    font-size: 2.2vw;
  }
`;
const Flash = styled.h1`
  animation: 2s ${flashAnimation};
  animation-iteration-count: infinite;
  font-size: 2.5vw;
`;

const FaPaperPlaneBox = styled(FaPaperPlane)`
width: 1.5vw;
height: 1.5vw;
position: relative;
top: 1vw;
right: -1.5vw;
transform: rotate(7deg);
cursor: pointer;

@media only screen and (max-width: 600px)
{
right: -1vw;
top: 1.4vw;
}

`