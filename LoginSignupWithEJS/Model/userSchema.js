
const mongoose  = require("mongoose")


const UserSchema = mongoose.Schema({
    username : {type : String},
    email : {type : String, require : true},
    password : {type : String,require : true},
    role : {type : String, default : "user"}
})

const UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel