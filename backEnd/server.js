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

  // Handle disconnect
  socket.on('disconnect', () => {
    clientNo--;
    console.log('disconnected');
    console.log(clientNo)
  })

  // Used when Host starts a lobby
  socket.on('createLobby', (socketId) => {
    console.log('sending id');
    console.log(socketId);
    socket.emit("sendId", socket.id);
  })
  
  // Used when user joins lobby through pin (not host)
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

  // Used when prompting for nickname info
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

  // 
  socket.on('startGame', (object) => {
    console.log("startGameConfirmed");
    console.log(object);
    // socket.to(object).emit('startGameConfirmed');
    // socket.emit('startGameConfirmed', object);
    io.to(object).emit("startGameConfirmed");
    // io.in(object).emit("startGameConfirmed");

  })

  // Used when Ending Game
  socket.on('gameOver', (roomId) => {
    emitter.in(roomId).disconnectSockets(true);
  })

})


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