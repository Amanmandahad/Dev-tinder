const express = require('express');
const authRouter = express.Router();
const {validatesignup} = require('../utils/validation')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
// Creating a new User // Creating a new User // Creating a new User // Creating a new User 
authRouter.post('/signup', async (req, res)=>{
    try {
      validatesignup(req);
      const {firstName, lastName, emailId,password,gender,skills,photoUrl,about,age} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User(
        {
          firstName ,
          skills,
          gender,
          photoUrl,
          about,
          age ,
          lastName,
          emailId,
          password: hashedPassword,
        }
      );
      await user.save();
      res.send('User added successfully');
    }catch(err){
      res.status(400).send(err.message);
    }
    
})

// Creating login api // Creating login api // Creating login api // Creating login api// Creating login api
authRouter.post('/login', async(req, res) => {
    try{
  const {emailId, password} = req.body;
    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error ("User not found");
    }
    const ispassowordvalid = await bcrypt.compare(password, user.password);
    if(ispassowordvalid){
      const token = await jwt.sign({ _id : user._id },"AMANDEVTINDER",{
        expiresIn: '7d',
      })
  
      res.cookie("token", token)
      res.send("Logged in successfully");
    }else{
      throw new Error ("Invalid password");
    }
    }catch(e){
      res.status(400).send({message: e.message});
    }
  })


  // Logout api // Logout api // Logout api // Logout api // Logout api  // Logout api // Logout api // Logout api // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api  // Logout api
authRouter.post('/logout',async (req,res) =>{
  res.cookie("token",null,{
    expires: new Date(Date.now()),
  }),
  res.send("Logged out successfully");
} )


module.exports = authRouter;