const express = require('express')

const app = express()

app.use("/",(req,res)=>{
    res.send("Hello, Worldsss!")
})

app.listen(7777)