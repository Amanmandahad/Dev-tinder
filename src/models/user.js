const validator = require('validator');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    trim: true,
    maxLength: 10,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    trim: true,
    maxLength: 20,
  },
  emailId: {
    type: String,
    minLength: 4,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
    }
  },
  password: {
    type: String,
    minLength: 8,
    trim: true,
    maxLength: 100,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password");
      }
    }
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["Male", "Female"].includes(value)) {
        throw new Error('Choose a valid gender');
      }
    },
    maxLength: 10,
    required: true,
  },


  
  about: {
    type: String,
    default: "This is a default value",
  },
  skills: {
    type: [String],
    trim: true,
    required: true,
   
  },
  photoUrl: {
    type: String,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Invalid photo URL');
      }
    }
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
