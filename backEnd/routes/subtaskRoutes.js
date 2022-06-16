const express = require('express');
const router = express.Router();
const { getSubtasks, getASubtasks, createSubtasks, updateSubtasks, deleteSubtasks } = require('../controllers/subtaskController.js')



//First endpoint
router.get('/allsubtasks', getSubtasks)

//second endpoint
router.get('/subtask/:id', getASubtasks)

//First endpoint
router.post('/createsubtasks', createSubtasks)

//First endpoint
router.put('/updatesubtask/:id', updateSubtasks)

//First endpoint
router.delete('/deletesubtask/:id', deleteSubtasks)

module.exports = router;