const app = require('express')();
const dotenv = require('dotenv');
const log = require('@ajar/marker');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();
const { PORT, HOST, CLIENT_URL } = process.env;

app.use(cors());
app.use('*', (req, res) => res.send('hello from express'));
const http = require('http').createServer(app);

(async () => {
  await http.listen(PORT, HOST);
  log.magenta(`server is live on`, `  ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`)
})().catch(error => log.error(error));

const io = new Server(http, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

let clients = {};
const play = 'play';
const ready = 'ready';
const chat_message = 'chat_message';
const leave = 'leave';

// on player connection
io.sockets.on('connection', socket => {

  // on player disconnect
  socket.on('disconnect', function () {
    console.log('===============================================');
    console.log("disconnect", socket.id)
    if (clients.hasOwnProperty(socket.id)) {
      console.log(`${socket.id} has leaves this room: ${clients[socket.id]}`);
      socket.to(clients[socket.id]).emit("data", { leave: leave });
      clients[socket.id] = '';
    }
  });
  
  // listening...
  socket.on('data', (data = {}) => {
    const { room, action, board, turn, to_player, ships, guess, message,  is_winning } = data;

    // play - means joining a room
    if (action === play && room !== null) {
      socket.join(room);
      console.log("inside room " + room);
      clients[socket.id] = room;
      // tell the client that another player is in (and then show the 'ready' button)
      if (Object.values(clients).filter(r => r === room).length === 2) {
        console.log("both players are inside!");
        io.in(room).emit("data", { other_player_connected: true });
      }
    }

    // ready - sends the players board and turn to the other player
    if (action === ready) {
      if (to_player === "1") {
        socket.to(room).emit("data", { board, ships, turn, to_player });
        console.log(">>>emiting from server to: player " + to_player + " ,player2 board: " + "board2" + " ,does player2 starts?: " + turn);

        // if both players are ready - start the game
        io.in(room).emit("data", { ready_to_start: true });
        console.log(">>>emiting to both players: both players are ready to start");
      }
      else {
        socket.to(room).emit("data", { board, ships, turn, to_player });
        console.log(">>>emiting from server to: player " + to_player + " ,player1 board: " + "board1" + " ,does player2 starts?: " + turn);
      }
    }

    // guess - sending a guess to the other player
    if (guess) {
      socket.to(room).emit("data", { guess });
      console.log('The server emited the guess:', guess)
    }

    // chat_message - sending a message to the other player
    if (action === chat_message) {
      console.log("message recived:", message);
      socket.to(room).emit("data", { message });
    }

    // is_winning - if one of the players won, notify the players
    if (is_winning) {
      socket.to(room).emit("data", { is_winning });
      console.log("the server emiting victory to the other player");
    }
  })
});

