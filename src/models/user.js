const mongoose = require('mongoose');
const validator = require('validator')
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
    maxlength:40,
    validate (value){
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address" + value);
      }
    }
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    validate (value){
      if( !validator.isStrongPassword(value)){
 throw new Error("Enter a strong password"  + value);
      }
    }
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


 skills : {
  type: [String],
 },

  photoUrl: {
    type: String,
    validate(value){
     if(!validator.isURL(value)) {
   throw new Error("Invalid URL format");
     }
    }
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
