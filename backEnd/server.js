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
const io = require("socket.io")(server, {cors: {origin: "*"}});

// Socket Section

io.on('connection', socket => {

  console.log('new connection'); 
  
  socket.on('disconnect', () => console.log('disconnected')); 

  socket.on('createLobby', () => socket.emit("sendId", socket.id));

})

io.on("createLobby", socket => {
  console.log('in lobby')
  // const pin = await fetchUserId(socket);
  const pin = fetchUserId(socket);
  socket.send(pin);
  // socket.to()
  console.log("connected");
})

io.on("join_room", room => {
  socket.join(room);
});



//




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