const mongoose = require('mongoose');
const { trim } = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15
  },

  lastName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 15
  },

  emailId: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    maxlength:40
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 10
  },

  age: {
    type: Number,
    min: 18,
    max: 60
  },

  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender should be male, female or others");
      }
    }
  },

  photoUrl: {
    type: String,
  },

  about: {
    type: String,
    trim: true,
    default: "This is the default value for this user",
  }
},{
  timestamps : true,
})


const User = mongoose.model('User',userSchema);
module.exports = User;
