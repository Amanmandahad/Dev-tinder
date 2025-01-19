const express = require('express');
const requestRouter = express.Router();
const {Auth} = require('../middlewares/Auth')



requestRouter.post('/sendconnectionreq', Auth ,(req, res)=>{
    const user = req.user;
     res.send( user.firstName + " sent connection req")
     
   })



module.exports = requestRouter;