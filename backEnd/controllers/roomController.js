const roomSchema = require("../model/roomSchema.js")
const operation = require("../controllers/dbController.js");

const createRoom = operation.createRoom(roomSchema);
const deleteRoom = operation.deleteRoom(roomSchema);
const getRoom = operation.getRoom(roomSchema);

module.exports = {
    createRoom,
    deleteRoom,
    getRoom
}