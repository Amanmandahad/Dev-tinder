const express = require('express');
require('./config/database')
const app = express();
const connectDb = require('./config/database');
const User = require('./models/user')

app.post('/signup', async (req, res) => {
    // Creating a new instance
    const user=  new User ({
        firstName : "Aman",
        lastName : "Mandahad",
        emailId : "aman@gmail.com",
        password : "1234566"
    }) 
  try{
    await  user.save()
    res.send('user added successfullyyy')
  }catch(err){
    res.status(400).send({"error": err})
  }
})



connectDb().then(()=>{
    console.log('MongoDB connected...');
}).catch(err=>{
    console.error('Error connecting to MongoDB:', err);
})

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});

