const express = require('express');
const requestRouter = express.Router();
const {Auth} = require('../middlewares/Auth')
const ConnectionRequestmodel = require('../models/connectionRequest')
const User = require('../models/user')

requestRouter.post('/request/send/:status/:toUserId', Auth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // Assuming `Auth` middleware attaches `user` to the request
    const toUserId = req.params.toUserId;
    const status = req.params.status; 

    const allowedstatus = ["ignored","interested"]
if(!allowedstatus.includes(status)){
return res.status(400).json({message: 'Invalid status'})
}

const existingconnectionreq = await ConnectionRequestmodel.findOne({
  $or : [
    { fromUserId,toUserId },
    { fromUserId: toUserId, toUserId: fromUserId }
  ]
})

if (existingconnectionreq){
  return res.status(400).json({ message: 'Request already exist' });
}

const touser = await User.findById(toUserId)

if(!touser){
return res.status(400).json({message: 'User not found'})
}
    const connectionRequest = new ConnectionRequestmodel({
      fromUserId,
      toUserId,
      status
    });
    const data = await connectionRequest.save();
    res.json({
      message: `${ req.user.firstName} is ${status} in ${touser.firstName} `,
      data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


requestRouter.post('/request/review/:status/:requestId', Auth,async(req,res) =>{
  try{
 const loggedInUser = req.user;
const {status, requestId} = req.params;

const allowedstatus = ["accepted","rejected"]

if(!allowedstatus.includes(status)){
return res.status(400).json({message: 'Invalid status'})
}

const connectionRequest = await ConnectionRequestmodel.findById({
  _id: requestId,
  toUserId: loggedInUser._id,
  status: "interested"
});

if(!connectionRequest){
return res.status(400).json({message: 'Invalid request or status'})
}

connectionRequest.status = status;
const data = await connectionRequest.save();

res.json({
  data,
});

  }catch(err){
    res.status(400).json({ message: err.message });
  }
}
);
module.exports = requestRouter;