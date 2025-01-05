const express = require('express')
const app = express()
const connectDb = require('./config/database')
const User = require('./models/user')
app.use(express.json());





// Creating a new User // Creating a new User // Creating a new User // Creating a new User 
app.post('/signup', async (req, res)=>{
  const user = new User(req.body)
try {
  await user.save();
  res.send('User added successfully');
}catch(err){
  res.status(400).send("user added successfully");
}
})


// getting all the users from the database // // getting all the users from the database // // getting all the users from the database // 
app.get('/feed', async (req, res) => {
  try{
    const users = await User.find({});
    res.send(users);
  }catch(err){
    res.status(400).json({message: err.message});
  }
  })
  
  

// Geeting user using emailid // Geeting user using emailid // Geeting user using emailid
app.get('/user', async (req, res) => {
try{
  const userEmail = req.body.emailId;
  const users = await User.find({emailId : userEmail});
  res.send(users);
}catch(err){
  res.status(400).json({message: err.message});
}
})

// Delelting the user  // Delelting the user // Delelting the user

app.delete('/user', async (req, res) => {
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);;
    if(!user){
     return res.status(400).json({message: "user not found"});
    }
    res.send("user deleted successfully");
  }catch(err){
    res.status(400).json({message: err.message});
  }
  })


app.patch('/user',async (req, res)=>{
  const userId = req.body.userId;
  const data = req.body;
try{
await  User.findOneAndUpdate({_id : userId}, data);
res.send("user updated successfully")
}catch(err){
  res.status(400).json({message: err.message});
}
})









connectDb().then(()=>{
  console.log('Connected to MongoDB');
  app.listen(7777,()=>{
    console.log('Server is running on port 7777')   
  })
})
.catch((err)=>{
  console.log(" Err while connecting to MongoDB");
  
})