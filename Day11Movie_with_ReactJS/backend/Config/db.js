const mongoose = require("mongoose")

const connect = async ()=>{
    await mongoose.connect(`mongodb+srv://deepak:pandey@cluster0.ytx2l.mongodb.net/Movie?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Database connected")
}

module.exports = connect