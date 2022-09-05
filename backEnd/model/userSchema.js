const mongoose = require('mongoose')

// Validation for user info occurs in validation.js controller

const userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true, trim: true, minlength: 3, maxlength: 15},
  email: {type: String, unique: true, lowercase: true, required: true, trim: true},
  password: {type: String, required: true},
  registrationDate: {type: Date, default: Date.now },
  admin: {type: Boolean, default: false}
})

const userDb = mongoose.model('users', userSchema)
module.exports = userDb
