const express = require('express');
const router = express.Router();

router.use('/tasks', require('./routes/taskRoutes.js'))
router.use('/subtasks', require('./routes/subtaskRoutes.js'))
router.use('/users', require('./routes/userRoutes.js'))

module.exports = router;