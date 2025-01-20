const express = require('express');
const profileRouter = express.Router();
const {Auth} = require('../middlewares/Auth')
const {validateeditprofiledata} = require('../utils/validation')
// Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user 
profileRouter.get('/profile/view', Auth ,async (req, res) => { 
    try{
    const user = req.user;
      res.send(user)
    }catch(e){
    throw new Error ("invalid token")
    }
      
    });


profileRouter.patch('/profile/edit', Auth , async (req, res) => {

try{
if(!validateeditprofiledata(req)){
  throw new Error ("Invalid token")
}
const loggedinuser = req.user;
Object.keys(req.body).forEach((key) => (loggedinuser[key] = req.body[key]));

await loggedinuser.save();
res.json({
  message: `${loggedinuser.firstName} Profile updated successfully`,
  user: loggedinuser,
})
}catch(e){
  res.status(400).json({ message: e.message })  
}

})







 module.exports = profileRouter;