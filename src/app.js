const express = require('express');
require('./config/database')
const app = express();
const connectDb = require('./config/database');















connectDb().then(()=>{
    console.log('MongoDB connected...');
}).catch(err=>{
    console.error('Error connecting to MongoDB:', err);
})

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});

