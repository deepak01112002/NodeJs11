const express = require("express")
const connection = require("./confiq/db")
const UserRouter = require("./Routes/UserRoute")


const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))


app.use("/",UserRouter)


app.listen(8080,()=>{
    connection()
    console.log("Server is Connected !!")
})