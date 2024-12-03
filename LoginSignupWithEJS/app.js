const express = require("express")
const connection = require("./confiq/db")
const cookie = require("cookie-parser")
const UserRouter = require("./Routes/UserRoute")
const BlogRouter = require("./Routes/blogRoute")


const app = express()
app.use(cookie())
app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))


app.use("/",UserRouter)

app.use("/blog",BlogRouter)


app.listen(8080,()=>{
    connection()
    console.log("Server is Connected !!")
})