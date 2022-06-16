const express = require('express');
const router = express.Router();
const { getTasks, getATasks, createTasks, updateTask, deleteTasks } = require('../controllers/taskController')

//First endpoint
router.get('/alltasks', getTasks)

//second endpoint
router.get('/singletask/:id', getATasks)

//First endpoint
router.post('/createtask', createTasks)

//First endpoint
router.put('/updatetask/:id', updateTask)

//First endpoint
router.delete('/deletetask/:id', deleteTasks)

module.exports = router;