const express = require('express');

const router = express.Router();
const { createQuiz, getQuizzesForUser } = require ('../controllers/quizController');

router.post('/create-a-quiz', createQuiz)
router.get('/view-quiz/:id')// currently unfinished
router.get('/quizzesForUser/:userId', getQuizzesForUser)
// router.get('/allusers', getUsers)
// router.get('/singleuser/:id', getAUser)
// router.get('/singleuserByUsername/:username', getAUserByUsername)
// router.post('/login', loginUser)
// router.post('/createuser', createUser)
// router.put('/updateuser/:id', updateUser)
// router.delete('/deleteuser/:id', deleteUser)

module.exports = router;
