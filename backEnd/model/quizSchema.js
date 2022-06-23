const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
  title: {type: String}, // needs to have unique active for two conditions. Unique for title, and user.
  description: {type: String},
  author: {type: String},
  authorId: {type: String},
  // quizId: {type: String},
  questions: []
})

const quizDb = mongoose.model('quizDb', quizSchema)
module.exports = quizDb
