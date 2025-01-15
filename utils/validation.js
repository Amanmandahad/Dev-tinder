const validator = require('validator')

const validateSignupdata = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName ||!lastName ||!email ||!password) {
        throw new Error('All fields are required');
    }else if(!validator.isEmail(emailId)){
        throw new Error('Invalid email address');
    }else if (!validator.isStrongPassword(password)){
        throw new Error('Password should be strong');
    }
}

module.exports = {validateSignupdata};