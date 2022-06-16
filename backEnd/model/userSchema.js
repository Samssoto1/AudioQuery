const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  registrationDate: {type: Date, default: Date.now },
  quizzes: {type: Array, default: []},
  admin: {type: Boolean, default: false}
})

const userDb = mongoose.model('users', userSchema)
module.exports = userDb
