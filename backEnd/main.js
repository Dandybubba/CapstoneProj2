const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/capstone2website",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err)
    {
        console.log("connected to db")
    }else{
        console.log("error",err)
    }
})
require("./routes.js")(app);
// set port, listen for requests
const PORT = 3000;

app.listen(3000,()=>{
    console.log("on port 3000")
})