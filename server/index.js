const app = require('express')();
const dotenv = require('dotenv') 
const log = require('@ajar/marker'); 
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();
app.use(cors());
app.use('*',(req,res)=> res.send('hello from express'));
const http = require('http').createServer(app);

// *** needs to be dynamic
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

    const { room, action, guess, board, turn, message, to_player, ships} = data;

    const play = 'play';
    const ready = 'ready';

    // play - means joining a room.
    if (action === play && room !== null) {
      socket.join(room);
      console.log("inside room " + room);
    }

    // ready - sends the players board to the other player.
    if (action === ready) {
      if (to_player === "1") {
        socket.to(room).emit("data",{ board, ships, turn, to_player });
        console.log( ">>>emiting from server to: player " + to_player + " ,player2 board: " + "board2"+ " ,does player2 starts?: " + turn );

        // if both players are ready - start the game.
        io.in(room).emit("data",{ ready_to_start: true });
        console.log( ">>>emiting to both players: both players are ready to start" );
      }
      else {
        socket.to(room).emit("data",{ board, ships, turn, to_player });
        console.log( ">>>emiting from server to: player " + to_player + " ,player1 board: " + "board1" + " ,does player2 starts?: " + turn );
      }
    }

    // guess - passing guesses between the players.
    if ( guess ) { 
      socket.to(room).emit("data",{ guess });
      console.log( 'The server emited the guess:', guess )
    }
    
    // // Send a message. 
    // if ( message ) {
    //   console.log("message recived:");
    //   console.dir(message);
    //   console.dir(board);
    // }

    // leave - player disconnected.
    if (action === 'leave') {
      socket.leave(room, () => {
        // send message to this client
        // spark.write('you left room ' + room);
        // send message to all clients except this one
        // spark.room(room).except(spark.id).write(spark.id + ' left room ' + room);
      });
    }

  })
});

