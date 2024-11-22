const express = require("express")
const a = require("../Controller/UserController")
const UserRouter = express.Router()



UserRouter.get("/",a)



module.exports = UserRouter