const express = require('express')
const app = express()
const connectDb = require('./config/database')
app.use('/home', (req, res,) =>{
  res.send('Welcome to the Home Page')
})




connectDb().then(()=>{
  console.log('Connected to MongoDB');
  app.listen(7777,()=>{
    console.log('Server is running on port 7777')
   
  })
})
.catch((err)=>{
  console.error(err);
})