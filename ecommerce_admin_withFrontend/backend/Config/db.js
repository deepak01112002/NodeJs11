const mongoose = require("mongoose")


const connection = async()=>{
    await mongoose.connect(`mongodb+srv://deepak:pandey@cluster0.ytx2l.mongodb.net/adminPanel?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Database Connected");
    
}

module.exports = connection