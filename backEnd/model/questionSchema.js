const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  questionTitle: {type: String},
  answerOne: {type: String},
  answerTwo: {type: String},
  answerThree: {type: String},
  answerFour: {type: String},
  correctAnswer: {type: Object},
  quizId: {type: String},
  songId: {type: String},
  songTitle: {type: String} // prob not a good idea to have this here but it helps with identifying quiz question by the name without calling all the time
})

const questionDb = mongoose.model('question', questionSchema)
module.exports = questionDb