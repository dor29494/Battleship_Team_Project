import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TopBar from "./TopBar"
import UserGrid from "./UserGrid"
import OppnentGrid from "./OppnentGrid"
import Footer from "./Footer"
import Input from "./Input"
import { BsContext } from "../stateManager/stateManager"
import socketIOClient from 'socket.io-client'
function App() {
  async function showId(socket){  
    console.log("socketid is: ", await socket.current.id)
}
  // var socket = null;
  const [txt, setTxt] = useState("");
  const [username, setUsername] = useState("");
  const [all_messages, set_all_messages] = useState([]);
  const socket = useRef(null);
  const [roomtojoin, set_roomtojoin] = useState('');
  let arr = [];
  useEffect(() => {
    let myRef = {};
    if (socket.current === null) socket.current = socketIOClient('http://localhost:3000')
    setTimeout(() => {
      set_roomtojoin(socket.current.id);
    }, 1000);
    socket.current.on('SET_USERNAME', (username) => {
      console.log("username: ", username)
    })
    socket.current.on('room', (username) => {
      console.log("JOIN TO ROOM: ", username)
    })
    socket.current.on("CREATE_MESSAGE", (message) => {
      console.log(">>>", message)
    })
  }, [])
  const sendChat = (socket, roomtojoin) => {
    if (!roomtojoin) roomtojoin = socket.current.id;
    //  socket.current.emit('CREATE_MESSAGE', 'test message')
    //  socket.current.emit('SEND_MESSAGE', "TEST2!")
    socket.current.emit('room', roomtojoin);
    console.log("try to join to: ", roomtojoin)
  }


  let myRef = React.createRef();
  const handlerCreateMessage = (message, e) => {
    message.username = username;
    // set_all_messages([...all_messages, message]);
    socket.current.emit('SEND_MESSAGE', message)
    // setTxt("");
  }



  const { first_state, ships_array, grid_array, set_ships_array, set_grid_array } = useContext(BsContext);
  return (
    <>
      <TopBar />
      <GameWrapper>

        <UserGrid />
        <Input sendChat={sendChat} socket={socket} />
        <OppnentGrid>
        </OppnentGrid>
        <Footer />
      </GameWrapper>
    </>
  );
}
export default App;
const ShapedBackground = styled.div`
background: #06bcfb;
background-image: linear-gradient(315deg, #06bcfb 0%, #4884ee 74%);
height: 900px;
position: fixed;
border: 1px solid red;
border-radius: 50%;

`
const GameWrapper = styled.div`
margin-top: 9rem;
width: 1200px;
display: flex;
justify-content: space-between;
`
