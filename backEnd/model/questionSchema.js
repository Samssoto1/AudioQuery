const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  questionTitle: {type: String},
  answers: {type: Array},
  // answerOne: {type: String},
  // answerTwo: {type: String},
  // answerThree: {type: String},
  // answerFour: {type: String},
  correctAnswer: {type: Array},
  quizId: {type: String},
  songId: {type: String}
})

const questionDb = mongoose.model('question', questionSchema)
module.exports = questionDb