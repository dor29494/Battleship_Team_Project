require('dotenv').config()

const Primus = require('primus');
const Rooms = require('primus-rooms');
const http = require('http');
const fs = require('fs');

const log = require('@ajar/marker')

const { API_PORT, API_HOST } = process.env;

const server = http.createServer((req, res) => {
  //log the request url
  log.d('req.url: ', req.url);

  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(__dirname + '/public/index.html').pipe(res);
});
let users = {};

let primus = new Primus(server, { transformer: 'sockjs' });
// add rooms to Primus
primus.plugin('rooms', Rooms);

primus.on('connection', spark => {
  // if (!spark.name) spark.name = spark.id

  // log.d('--> spark.id: ',spark.id);

  spark.on('data', (data = {}) => {
    spark.write(data);
    console.log(data);
//     if (data.message) {
//       let users = {}
//       let wordArray = data.message.split(' ');
//       if (wordArray[0] === "/nick" && wordArray[1]) {
//         spark.oldname = spark.name
//         users[spark.id] == wordArray[1]
//         spark.name = wordArray[1]
//         spark.write(">> Your new nick name is: " + spark.name);
//         // send message to all clients except this one
//         spark.room(spark.room).except(spark.id).write(spark.oldname + " changed his nickname to " + spark.name);
// return false;


//       }
//     }
    // log.obj(data,'--> data:')

    const { action, room, message, value } = data
    if (action === "name") {
      spark.name = value
    }

    // log.magenta(`action: ${action}`)
    // log.yellow(`room: ${room}`)
    // log.info(`message: ${message}`)

    // join a room
    if (action === 'join') {
      spark.join(room, () => {
        // send message to this client
        spark.write('you joined room ' + room);
        // send message to all clients except this one
        spark.room(room).except(spark.id).write(`${spark.name} joined room ${room}`);
        // spark.room(room).except(spark.id).write(
        //   {
        //     whoishere: "whoishere"
        //   }
        // );
      });
    }

    // leave a room
    if (action === 'leave') {
      spark.leave(room, () => {
        // send message to this client
        spark.write('you left room ' + room);
        // send message to all clients except this one
        spark.room(room).except(spark.id).write(spark.name + ' left room ' + room);
      });
    }
    // Typing
    if (data.typing) {
      let obj = {
        type: "typing",
        typing: data.typing,
        user: spark.name
      }
      spark.room(room).except(spark.id).write(
        obj
      )
    }
    // Send a message to a room
    if (data.type === "message") {
      // log.magenta(`writing message to room  ${room}`);
      spark.room(room).write(spark.name + ": " + message);
    }
    console.log("ROOM: ", room)
    if (message && room === undefined) {
      console.log("!!!")
      // log.magenta(`writing message to all  ${message}`);
      primus.write("HEHEH");
    }
  })
});


//start the server
(async () => {
  await server.listen(API_PORT, API_HOST)
  log.magenta(`server is live on`, `  ✨ ⚡  http://${API_HOST}:${API_PORT} ✨ ⚡`)
})().catch(error => log.error(error))








