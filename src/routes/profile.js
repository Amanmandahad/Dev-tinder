const express = require('express');
const profileRouter = express.Router();
const {Auth} = require('../middlewares/Auth')

// Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user // Geeting the user 
profileRouter.get('/profile', Auth ,async (req, res) => { 
    try{
    const user = req.user;
      res.send(user)
    }catch(e){
    throw new Error ("invalid token")
    }
      
    });






 module.exports = profileRouter;