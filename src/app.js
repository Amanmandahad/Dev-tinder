const express = require('express');
const app = express();
const connectDb = require('./config/database');
const User = require('./models/user')


app.use(express.json());
app.post('/signup', async (req, res) => {
   const user = new User(req.body);
   try{
    await user.save();
    res.send('User added successfully');
   }catch (err){
    res.status(400).json({message: err.message});
   }
})



// Getting 1  user by lastname

app.get('/user', async(req,res)=>{
const userlastname = req.body.lastname;
try{
  const user =  await User.findOne({lastName:userlastname})
  res.send(user); 
}catch(err){
  res.status(400).json({message: err.message});
}
})

// getting all the users 
app.get('/feed',async(req,res)=>{
  try{
    const allusers = await User.findOne({})
    res.send(allusers);  
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


// Getting the user by id

app.get('/id',async(req,res)=>{
  const id = req.body.id;
  try{
const userid = await User.findOne({id:id})
    res.send(userid);
  }catch(err){
    res.status(400).json({message: err.message});
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

