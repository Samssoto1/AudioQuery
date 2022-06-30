const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('./db/connection.js');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cors = require('cors')

const checkAuth = require("./middleware/check-auth");
const auth = require("./controllers/auth.js")


// define port for server
const PORT = process.env.DEV_PORT || 5000

// an instance of the express server/package
const app = express()

app.use(express.json())
app.use(Cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Change * to individual client side later
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json())

// app.get('/admin', auth.verifyToken, (req, res) => {
//   res.status(200).json({message: "success"})
// })

app.use('/api', require('./routes.js'))

app.listen(PORT, () => {
  console.log(`Server Connected on ${PORT}...`)
});

module.exports = app;