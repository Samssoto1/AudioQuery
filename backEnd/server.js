// define port for server
const PORT = process.env.DEV_PORT || 8000

// an instance of the express server/package
const express = require('express');
const app = express()
const dotenv = require('dotenv').config();
const mongoose = require('./db/connection.js');
const bodyParser = require('body-parser');
const Cors = require('cors')

const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: {origin: "*", perMessageDeflate: false}});

// Socket Section

let clientNo = 0;

io.on('connection', socket => {
  clientNo++;
  console.log(clientNo);
  console.log('new connection');

  console.log(io.sockets.adapter.rooms);

  // socket.on('connection', () => console.log('new connection'))
  
  socket.on('disconnect', () => {
    clientNo--;
    console.log('disconnected');
    console.log(clientNo)
  })

  socket.on('createLobby', (socketId) => {
    console.log('sending id');
    console.log(socketId);
    socket.emit("sendId", socket.id);
  })
  
  socket.on('joinLobby', (object) => {
    try{
      socket.nickname = object.nickname;
      socket.join(object.socketId);
      console.log(object.socketId);
      console.log('User has joined the lobby')

      socket.emit("joined room")
    }
    catch{
      console.log('Error... could not join room');
    }
  })

  socket.on('getRoomInfo', (object) => {
    console.log(object)
    console.log(socket.nickname)
    const clients = io.sockets.adapter.rooms.get(object);
    console.log(clients);
    // loop over set
    clients.forEach(function(entry, key, set){
      try{
        console.log(key.nickname)
        // console.log(socket.nickname);
      }
      catch{
        console.log(entry +' : ' + key);
      }
    })

  })

  socket.on('gameOver', (roomId) => {
    emitter.in(roomId).disconnectSockets(true);
  })

  // io.of('/').adapter.on("join-room", (room, id) => {
  //   console.log(`socket ${id} has joined room ${room}`);
  // })

  

  // socket.on('sendNicknameGetUserList', (nickname) => {
  //   socket.
  // })

})

// io.on("createLobby", socket => {
//   console.log('in lobby')
//   // const pin = await fetchUserId(socket);
//   const pin = fetchUserId(socket);
//   socket.send(pin);
//   // socket.to()
//   console.log("connected");
// })

// io.on("join_room", room => {
//   socket.join(room);
// });



// //




const checkAuth = require("./middleware/check-auth");
const auth = require("./controllers/auth.js")



app.use(express.json())
app.use(Cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Change * to individual client side later
  // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json())

// app.get('/admin', auth.verifyToken, (req, res) => {
//   res.status(200).json({message: "success"})
// })

app.use('/api', require('./routes.js'))

server.listen(PORT, () => {
  console.log(`Server Connected on ${PORT}...`)
});

module.exports = app;