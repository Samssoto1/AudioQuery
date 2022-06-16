const userSchema = require("../model/userSchema.js")
const operation = require("../controllers/dbController.js");


// funct to get all the tasks in the database
const getUsers = operation.toGetAll(userSchema);
// funct to get all the tasks in the database
const getAUser = operation.toGet(userSchema);
// funct to get all the tasks in the database
const createUser = operation.toCreate(userSchema);
// funct to get all the tasks in the database
const updateUser = operation.toUpdate(userSchema);
// funct to get all the tasks in the database
const deleteUser = operation.toDelete(userSchema);

const loginUser = operation.loginUser(userSchema);

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    createUser,
    getAUser,
    loginUser
}
