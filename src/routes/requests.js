const express = require('express');
const requestRouter = express.Router();
const {Auth} = require('../middlewares/Auth')



requestRouter.post('/sendconnectionreq', Auth ,(req, res)=>{
  try{
    const user = req.user;
    res.send( user.firstName + " sent connection req")
  }catch(e){
    res.status(500).json({ message: e.message })
  }
     
   })



module.exports = requestRouter;