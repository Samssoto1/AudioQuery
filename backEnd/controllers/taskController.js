// connect to my schema/database
const taskSchema = require("../model/taskSchema.js")
const operation = require("../controllers/dbController.js")

const getTasks = operation.toGetAll(taskSchema);
const getATasks = operation.toGet(taskSchema);
const createTasks = operation.toCreate(taskSchema);
const deleteTasks = operation.toDelete(taskSchema);
const updateTask = operation.toUpdate(taskSchema);

module.exports = {
    getTasks,
    updateTask,
    deleteTasks,
    createTasks,
    getATasks
}