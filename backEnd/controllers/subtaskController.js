const subtaskSchema = require("../model/subtaskSchema.js")
// funct to get all the subtasks in the database
const operation = require("../controllers/dbController.js")

const getSubtasks = operation.toGetAll(subtaskSchema)
const createSubtasks = operation.toCreate(subtaskSchema)
const updateSubtasks = operation.toUpdate(subtaskSchema)
const getASubtasks = operation.toGet(subtaskSchema)
const deleteSubtasks = operation.toDelete(subtaskSchema)


module.exports = {
    getSubtasks,
    updateSubtasks,
    deleteSubtasks,
    createSubtasks,
    getASubtasks
}