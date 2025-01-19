const jwt = require('jsonwebtoken');
const User = require('../models/user');
const cookieParser = require('cookie-parser');


const Auth = async (req,res,next)=>{
   try{
    const {token} = req.cookies
   if(!token){
       throw new Error (" token is not valid")
   }
   const decodedmessage = await jwt.verify(token,"AMANDEVTINDER")
   const {_id} = decodedmessage;
   const user = await User.findById(_id);
   if(!user){
       throw new Error("You are not authorized to access this route")
   }
    req.user = user;
   next();
 }catch(err){
    res.status(400).json({ "ERROR": err.message});
 }
   }

module.exports = {
    Auth,   
}