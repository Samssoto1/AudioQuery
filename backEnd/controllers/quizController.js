const quizSchema = require("../model/quizSchema.js")
const operation = require("../controllers/dbController.js");

const createQuiz = operation.createQuiz(quizSchema);
const getQuizzesForUser = operation.getQuizzesForUser(quizSchema);

module.exports = {
    createQuiz,
    getQuizzesForUser
}