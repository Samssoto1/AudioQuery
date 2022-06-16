const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  title: {type: String},
  artist: {type: String},
  audioImg,
  audioFile: {required: true}
})

const userDb = mongoose.model('songs', songSchema)
module.exports = userDb
