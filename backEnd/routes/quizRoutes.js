const express = require('express');

const router = express.Router();
const { createQuiz, getQuizzesForUser, deleteQuiz, uploadSong, getListOfSongs, getQuizById } = require ('../controllers/quizController');
const { getQuizQuestions, createQuestion, deleteQuizQuestion, deleteAllQuizQuestions, getQuestionById, updateQuestionByQuestionId} = require('../controllers/questionsController')

router.post('/create-a-quiz', createQuiz)
router.post('/create-a-question', createQuestion)
router.get('/view-quiz/:id')// currently unfinished
router.get('/quizzesForUser/:userId', getQuizzesForUser)
router.get('/getQuizQuestions/:quizId', getQuizQuestions)
router.get('/getQuestionById/:questionId', getQuestionById)
router.put('/updateQuestionByQuestionId', updateQuestionByQuestionId)
router.get('/getQuizById/:quizId', getQuizById)
router.delete('/delete/:quizId', deleteQuiz)


// MOVE THIS LATER (!IMPORTANT) shouldnt be in quiz routes. Api route could be changed for admin route.
router.post('/songUpload', uploadSong)
router.get('/getListOfSongs', getListOfSongs);

router.delete('/deleteQuestion/:questionId', deleteQuizQuestion)
router.delete('/deleteAllQuizQuestions/:quizId', deleteAllQuizQuestions)

module.exports = router;
