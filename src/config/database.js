const mongoose = require('mongoose');

const connectDb = async () => {
     await mongoose.connect(
        "mongodb+srv://mandahadaman2002:mandahadaman2002@devtinder.ryoyp.mongodb.net/?retryWrites=true&w=majority&appName=Devtinder/devtinder "
     )
}

module.exports = connectDb;