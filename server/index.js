const app = require('express')();
const dotenv = require('dotenv') 
const cors = require('cors') 
const log = require('@ajar/marker'); 

dotenv.config();
app.use(cors());
app.use('*',(req,res)=> res.send('hello from express'));
const http = require('http').createServer(app);

const PORT = 3000;
const HOST = "localhost";
const CLIENT_URL = "http://localhost:3001";

(async () => {
  await http.listen(PORT, HOST)
  log.magenta(`server is live on`, `  ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`)
})().catch(error => log.error(error));

const io = new Server(http, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
  }
});


io.sockets.on('connection', socket => {

  socket.on('data', (data = {}) => {

    const { room, action, guess, board, turn, message } = data;

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
      socket.join(room);
      console.log("inside room " + room);
        // spark('id here').write('message')
        // send message to this client
        // spark.write('you joined room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }

    // ready - sends the players board to the other player.
    if (action === ready) {
      if (turn === undefined) {
        socket.to(room).emit("data",{ board });
        console.log( "board 2: " + board )
        // + if both are ready - start the game.
        socket.emit("data",{ ready_to_start: true });
      }
      else {
        socket.to(room).emit("data",{ board, turn });
        console.log( "board 1: " + board + " turn: " + turn )
      }
      // send message to this client
      // spark.write('you joined room ' + room);
      // send message to all clients except this one
      // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }

    // guess - passing players guess to the other one.
    if ( guess ) { 
      socket.to(room).emit("data",{ guess });
        // send message to this client
        // spark.write('you joined room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(`${spark.id} joined room ${room}`);
    }
    
    // leave - player disconnected.
    if (action === 'leave') {
      socket.leave(room, () => {
        // send message to this client
        // spark.write('you left room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(spark.id + ' left room ' + room);
      });
    }

    // // Send a message. 
    if ( message ) {
      console.log("message recived:");
      console.dir(message);
    }
  })
});

