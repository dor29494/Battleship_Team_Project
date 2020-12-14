const Primus = require('primus');
const Rooms = require('primus-rooms');
const http = require('http');
const fs = require('fs');
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

  spark.on('data', (data = {}) => {

    const { room, action, guess, message, board, turn } = data;
    let player1;
    let player2;

    const play = 'play';
    const ready = 'ready';

    // data index: 
    // action - play, ready
    // room - the rooms id
    // message - for optional chat
    // board - to send playes boards to one another
    // guess - the guesses of the players

    // option for results: hit , miss , sink, win.

    // option for indexes: sea , ship , miss, hit, sink.

    // play - means joining a room.
    if (action === play) {
    
      // const playerId = nanoid(); ???
      spark.join(room, () => {
        // send message to this client
        // spark.write('you joined room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
      });
    }

    // ready - sends the players board to the other player.
    if (action === ready) {
      // + if both are ready - start the game.
      if (player1) {
        player2 = ready;
        spark.room(room).except(spark.id).write(board);
      }
      else {
        player1 = ready;
        spark.room(room).except(spark.id).write({ board , turn });
      }
      // send message to this client
      // spark.write('you joined room ' + room);
      // send message to all clients except this one
      // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }

    // guess - passing players guess to the other one.
    if ( guess ) { 
      spark.room(room).except(spark.id).write(guess);
        // send message to this client
        // spark.write('you joined room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }
    
    // leave - player disconnected.
    if (action === 'leave') {
      spark.leave(room, () => {
        // send message to this client
        spark.write('you left room ' + room);
        // send message to all clients except this one
        spark.room(room).except(spark.id).write(spark.id + ' left room ' + room);
      });
    }

    // // Send a message. 
    // if ( message ) {
    //   spark.room(room).write(message);
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
