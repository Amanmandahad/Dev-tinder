 const adminAuth = (req,res,next)=>{
    const token = 'xyz';
    const isAdminAuthorized = token === 'xyz';
    if(!isAdminAuthorized){
        res.status(401).json({message: 'Unauthorized access'});
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
}