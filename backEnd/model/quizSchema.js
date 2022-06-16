const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
  title: {type: String, unique: true},
  description: {type: String},
  questions: []
})

const userDb = mongoose.model('quizzes', quizSchema)
module.exports = userDb
