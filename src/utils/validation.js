const validator = require('validator')
const validatesignup = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if (!firstName, !lastName){
        throw new Error('First Name and Last Name are required');
    }else if (!validator.isEmail(emailId)){
        throw new Error('Invalid email address');
    }else if (!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password');
    }
}



const validateeditprofiledata = (req) => {
    const allowededitfields = ["firstName", "lastName", "emailId","gender","about","age","photoUrl","skills"];
const isEditallowed = Object.keys(req.body).every((field) =>
allowededitfields.includes(field)
);

return  isEditallowed;

};





module.exports = {
    validatesignup,
    validateeditprofiledata
};
