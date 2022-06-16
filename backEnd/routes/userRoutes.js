const express = require('express');

const router = express.Router();
const { getUsers, getAUser, createUser, updateUser, deleteUser, loginUser } = require ('../controllers/userController');

router.get('/allusers', getUsers)
router.get('/singleuser/:id', getAUser)
router.post('/login', loginUser)
router.post('/createuser', createUser)
router.put('/updateuser/:id', updateUser)
router.delete('/deleteuser/:id', deleteUser)

module.exports = router;
