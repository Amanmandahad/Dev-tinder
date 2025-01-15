const express = require('express')
const app = express()
const connectDb = require('./config/database')
const User = require('./models/user')
app.use(express.json());
const {validatesignup} = require('./utils/validation')
const bcrypt = require('bcrypt')
const {Auth} = require('./middlewares/Auth')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())


// Creating a new User // Creating a new User // Creating a new User // Creating a new User 
app.post('/signup', async (req, res)=>{
try {
  validatesignup(req);
  const {firstName, lastName, emailId,password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User(
    {
      firstName ,
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
app.post('/login', async(req, res) => {
  try{
const {emailId, password} = req.body;
  const user = await User.findOne({emailId : emailId});
  if(!user){
    throw new Error ("User not found");
  }
  const ispassowordvalid = await bcrypt.compare(password, user.password);
  if(ispassowordvalid){
    const token = await jwt.sign({ _id : user._id },"AMANDEVTINDER")

    res.cookie("token", token)
    res.send("Logged in successfully");
  }else{
    throw new Error ("Invalid password");
  }
  }catch(e){
    res.status(400).send({message: e.message});
  }
})


// Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user 
app.get('/profile', Auth ,async (req, res) => { 
try{
const user = req.user;
  res.send(user)
}catch(e){
throw new Error ("invalid token")
}
  
});






connectDb().then(()=>{
  console.log('Connected to MongoDB');
  app.listen(7777,()=>{
    console.log('Server is running on port 7777')   
  })
})
.catch((err)=>{
  console.log(" Err while connecting to MongoDB");
  
})