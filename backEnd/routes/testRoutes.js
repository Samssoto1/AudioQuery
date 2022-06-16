const express = require('express');
const router = express.Router();
const { getTasks, getATasks, createTasks, updateTask, deleteTasks } = require('../controllers/testController')

//First endpoint
router.get('/alltests', getTasks)

//second endpoint
router.get('/task:id', getATasks)

//First endpoint
router.post('/createtasks', createTasks)

//First endpoint
router.put('/updatetask:id', updateTask)

//First endpoint
router.delete('/deletetask:id', deleteTasks)

module.exports = router;