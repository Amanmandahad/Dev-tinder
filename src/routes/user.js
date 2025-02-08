const express = require('express');
const userRouter = express.Router();
const { Auth } = require('../middlewares/Auth');
const ConnectionRequestmodel = require('../models/connectionRequest');
const User = require('../models/user')
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
.populate("toUserId" ,["firstName", "lastName","age","gender","about","photoUrl","skills" ])

const data =  connectionRequest.map((row)=> {
 if(row.fromUserId._id.toString() === Loggedinuser._id.toString()) {
return row.toUserId
}
return row.fromUserId;
});
res.json({
    data
 });

}catch(err){
    res.status(400).send({ message: err.message }); 
}
});


userRouter.get('/user/feed',Auth,async(req,res)=>{
  try{

const loggedinuser =  req.user;


const page = parseInt(req.query.page) || 1;
let limit = parseInt(req.query.limit) || 10;
 limit = limit > 50 ? 50 : limit ;

const skip = (page - 1) * limit;


const connectionrequest = await ConnectionRequestmodel.find({
  $or : [
      { fromUserId: loggedinuser._id.toString()},
      { toUserId: loggedinuser._id.toString()}
     
  ]
}).select("fromUserId toUserId")

const hideusersfromfeed = new Set();
connectionrequest.forEach(req => {
  hideusersfromfeed.add(req.fromUserId);
  hideusersfromfeed.add(req.toUserId);
})

const user = await User.find({
   $and :[
    { _id: { $nin: Array.from(hideusersfromfeed) }},
    {_id :{ $ne : loggedinuser._id}},
   ]
}).select(["firstName", "lastName","age","gender","about","photoUrl","skills" ])
  .skip(skip)
  .limit(limit)

res.send(user);
  }catch(err){
    res.status(400).send({ message: err.message });  // Use 'e.message' here
  }
})

module.exports = userRouter;
