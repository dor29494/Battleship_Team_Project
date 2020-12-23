const express = require("express")
const http = require("http");
const socketIO = require("socket.io")
const cors = require("cors")
const timestamp = require('time-stamp');
// import express from "express";
// import socketIO from "socket.io"
// import cors from "cors";
// const { HOST, PORT } = process.env;
let HOST = 'localhost';
let PORT = 3000;
const app = express();

const server = http.createServer(app);

const io = socketIO(server);
app.use(cors());

let userCount = 0;
io.on('connection', socket => {
    let userid = socket.id
    userCount++;
        // socket.join(userid);
        console.log(userid);
    const username = `Guest${userCount}`
    // socket.emit('SET_USERNAME', username);
    io.sockets.emit('CREATE_MESSAGE', {
        message: `${username} connected`,
        time: timestamp('HH:mm:ss'),
        type: "server",
        userconnected: username,
    })
    socket.on('SEND_MESSAGE', (messageObject) => {
        io.sockets.emit('CREATE_MESSAGE', messageObject)
    })

    socket.on('disconnect', () => {
        io.sockets.emit('CREATE_MESSAGE', {
            message: `${username} disconnected`,
            time: timestamp('HH:mm:ss'),
            type: "server",
            userconnected: username
        })
    })
})

server.listen(PORT, () => console.log("YALLA ABA!"))