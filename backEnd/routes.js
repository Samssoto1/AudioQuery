const express = require('express');
const router = express.Router();

router.use('/users', require('./routes/userRoutes.js'))
router.use('/quiz', require('./routes/quizRoutes.js'))
router.use('/room', require('./routes/roomRoutes.js'))


module.exports = router;