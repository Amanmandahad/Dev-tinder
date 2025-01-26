const express = require('express');
const userRouter = express.Router();
const { Auth } = require('../middlewares/Auth');
const ConnectionRequestmodel = require('../models/connectionRequest');

userRouter.get('/user/request/received', Auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestmodel.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId",["firstName", "lastName","age","gender","about","photoUrl","skills" ])

    res.json({
      message: "All requests",
      data: connectionRequest,
    });
  } catch (e) {
    res.status(400).send({ message: e.message }); // Use 'e.message' here
  }
});


userRouter.get('/user/connections',Auth, async (req, res) => {
try{
const Loggedinuser = req.user;

const connectionRequest = await ConnectionRequestmodel.find({
    $or : [
        { fromUserId: Loggedinuser._id, status: "accepted"},
        { toUserId: Loggedinuser._id, status: "accepted" },
    ]
}).populate("fromUserId",["firstName", "lastName","age","gender","about","photoUrl","skills" ] )

const data =  connectionRequest.map((row)=> row.fromUserId);
res.json({
     data
 });

}catch(err){
    res.status(400).send({ message: err.message }); 
}
});



module.exports = userRouter;
