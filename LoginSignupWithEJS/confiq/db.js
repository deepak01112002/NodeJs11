const mongoose = require("mongoose")


const connection = async ()=>{
    await mongoose.connect("mongodb+srv://deepak:pandey@cluster0.ytx2l.mongodb.net/LoginSignup?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database connected successfully");
    
}


module.exports = connection