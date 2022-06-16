const express = require('express');
const router = express.Router();
const { getPrioritiess, getAPriorities, createPriorities, updatePriorities, deletePriorities } = require('../controllers/priorityController')



//First endpoint
router.get('/allpriorities', getPriorities)

//second endpoint
router.get('/priorities:id', getAPriorities)

//First endpoint
router.post('/createpriorities', createPriorities)

//First endpoint
router.put('/updatepriorities:id', updatePriorities)

//First endpoint
router.delete('/deletepriorities:id', deletePriorities)

module.exports = router;