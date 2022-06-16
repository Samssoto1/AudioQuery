const mongoose = require('mongoose');

/* Needs required: true (validation)*/
const taskSchema = mongoose.Schema({
    priority: Number,
    name: {type: String, trim: true,},
    description: {type: String, trim: true},
    userId: {type: String, trim: true},
    subtasks: Array,
	tag: {type: String, trim: true},
    createDate: Date,
	dueDate: Date,
	startDate: Date,
    status: Number
});

const taskDb = mongoose.model("taskDb", taskSchema);
module.exports = taskDb;