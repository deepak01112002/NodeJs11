const express = require("express")
const connection = require("./Config/db")
const UserRouter = require("./Routes/user.Routes")
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const UserModel = require("./Model/user.Model")



const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))

// passport start
app.use(session({secret : "lalalalalala"}))
app.use(passport.initialize())
app.use(passport.session())





app.use("/user",UserRouter)




app.listen(8080,()=>{
    connection()
    console.log("Server started !!")
})