const express = require('express');
const router = express.Router();

router.use('/users', require('./routes/userRoutes.js'))
router.use('/quiz', require('./routes/quizRoutes.js'))

module.exports = router;