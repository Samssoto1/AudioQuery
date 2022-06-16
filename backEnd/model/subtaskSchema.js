const mongoose = require('mongoose');
const subtaskSchema = mongoose.Schema({
    mainTaskId: String,
    subtaskDate: Date,
    subtaskNumber: Number,
    subtaskName: String,
    subtaskStatus: Boolean,
    completionTime: Date,
    taskOwner: String

});

const subtaskDb = mongoose.model("subtaskDb", subtaskSchema);
module.exports = subtaskDb;