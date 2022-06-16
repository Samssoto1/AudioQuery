const taskSchema = require("../model/taskSchema.js")
const operation = require("../controllers/dbController.js")

// funct to get all the tasks in the database
const getTasks = operation.toGetAll(taskSchema);
// funct to get all the tasks in the database
const getATasks = operation.toGet(taskSchema);
// funct to get all the tasks in the database
const createTasks = operation.toCreate(taskSchema);
// funct to get all the tasks in the database
const updateTask = operation.toUpdate(taskSchema);
// funct to get all the tasks in the database
const deleteTasks = operation.toDelete(taskSchema);

module.exports = {
    getTasks,
    updateTask,
    deleteTasks,
    createTasks,
    getATasks
}