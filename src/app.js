const express = require('express')
const app = express()
const connectDb = require('./config/database')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())
const authRouter = require ('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/user')


// testing

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);













connectDb().then(()=>{
  console.log('Connected to MongoDB');
  app.listen(7777,()=>{
    console.log('Server is running on port 7777')   
  })
})
.catch((err)=>{
  console.log(" Err while connecting to MongoDB");
  
})