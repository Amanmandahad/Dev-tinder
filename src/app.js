const express = require('express');
const app = express();
const connectDb = require('./config/database');
const User = require('./models/user')
const {validatesignup} = require('./utils/validation')
const bcrypt = require('bcrypt')
app.use(express.json());

// Adding data to the database  Adding data to the database  Adding data to the databasessss
app.post('/signup', async (req, res) => {
  
   try{
    validatesignup(req)
    const { firstName,lastName,emailId, password,gender,
      age,
      skills,
      photoUrl,
      about,} = req.body;
    const passwordhash = await bcrypt.hash(password,10)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password:  passwordhash,
      gender,
      age,
      skills,
      photoUrl,
      about,
    });
    await user.save();
    res.send('User added successfully');
   }catch (err){
    res.status(400).json({message: err.message});
   }
})


// checking the user login  checking the user login checking the user login
app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId});

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (ispassword) {

      
      res.send('Logged in successfully');
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




// Getting 1  user by lastname Getting 1  user by lastname  Getting 1  user by lastname
app.get('/user',async (req, res)=>{
  try{
    const   userlastname = req.body.lastname
  const user = await User.findOne({lastname: userlastname})
  res.send(user);
  } catch (error){
    res.status(400).json({message: err.message});
  }

})


// getting all the users  getting all the users  getting all the users  getting all the users 
app.get('/feed',async(req,res)=>{
  try{
    const allusers = await User.find({})
    res.send(allusers);  
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


// Getting 1 user the  by id Getting 1 user the  by id Getting 1 user the  by id Getting 1 user the  by id
app


//  deleting user deleting user deleting user deleting user
app.delete('/user', async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Updating the user Updating the user Updating the user
app.patch('/user', async(req,res)=>{
  const userId = req.body.userId;
const data = req.body
  try{
    const Allowedupdates = ["userId", "photoUrl", "about", "gender", "age", "skills"];

    const isUpdaredAllowed = Object.keys(data).every((k) =>
        Allowedupdates.includes(k));  
    if(!isUpdaredAllowed){

     throw new Error("Updates not allowed")
    }
    if(data?.skills.length > 10){
      throw new Error("Skills cannot exceed 10");
    }
  await User.findOneAndUpdate({_id : userId},data,{
    runValidators:true,
  })
  res.send("Updated successfully")
  }catch(err){
    res.status(400).json({ message: err.message });

  }
})




connectDb().then(()=>{
  console.log('Connected to MongoDB');
  app.listen('7000', ()=>{
    console.log('Server is running on port 7000');
  })
})
.catch(err =>{
  console.error('Error connecting to MongoDB:', err);
})

