// var app = require('express')();
const Primus = require('primus');
const Rooms = require('primus-rooms');
const http = require('http');
const fs = require('fs');
const { nanoid } = require('nanoid');
const log = require('@ajar/marker')

const { PORT } = process.env;

const server = http.createServer((req, res) => {
  //log the request url
  log.d('req.url: ', req.url);

  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(__dirname + '/socket-client-side.html').pipe(res);
});

let primus = new Primus(server, { transformer: 'sockjs' });
// add rooms to Primus
primus.plugin('rooms', Rooms);

primus.on('connection', spark => {

  log.d('--> spark.id: ', spark.id);

  spark.on('data', (data = {}) => {

    log.obj(data, '--> data:')

    const { action, room, message, board, guess } = data

    // players board
    let player1
    let player2

    log.magenta(`action: ${action}`)
    log.yellow(`room: ${room}`)
    log.info(`message: ${message}`)

    // play - means joining a room 
    if (action === 'play') {
      const roomId = nanoid();
      spark.join(roomId, () => {
        // send message to this client
        // spark.write('you joined room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
      });
    }

    // ready - locks the clients board and save it on the server.
    if (action === 'ready') {
      // + if both board are saved - start the game and randomizing turns.
      if (player1) {
        player2 = board;
        spark.write({ action: "start" });
      }
      else {
        player1 = board;
      }
      // send message to this client
      // spark.write('you joined room ' + room);
      // send message to all clients except this one
      // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }

    // shoots fired - checking if bulzai in the opponent's boad and returns result.
    if (action === 'shots fired') {
        board[guess.location] === "hit" ? 
        spark.write({ action: "hit" }) :
        spark.write({ action: "miss" });
        // send message to this client
        // spark.write('you joined room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }

    // option for results: hit , miss , sink, win.

    // option for indexes: sea , ship , miss, hit, sink.
    
    // leave - player disconnected.
    if (action === 'leave') {
      spark.leave(room, () => {
        // send message to this client
        spark.write('you left room ' + room);
        // send message to all clients except this one
        spark.room(room).except(spark.id).write(spark.id + ' left room ' + room);
      });
    }

    // // Send a message to a room
    // if (message && room) {
    //   log.magenta(`writing message to room  ${room}`);
    //   spark.room(room).write(message);
    // }
    // if (message && room === undefined) {
    //   log.magenta(`writing message to all  ${message}`);
    //   primus.write(message);
    // }

    // if (action === 'typing') {
    //   spark.room(room).except(spark.id).write({ isTyping: `${spark.id} is typing...` });
    // }

  })
});

//start the server
(async () => {
  await server.listen(PORT)
  log.magenta(`server is live on`, `  ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`)
})().catch(error => log.error(error));
