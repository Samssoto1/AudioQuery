const express = require('express');

const router = express.Router();
const { createRoom, deleteRoom, getRoom } = require ('../controllers/roomController');

router.post('/createRoom', createRoom)
router.delete('/deleteRoom/:roomId', deleteRoom)
router.get('/getRoom/:roomId', getRoom)

module.exports = router;