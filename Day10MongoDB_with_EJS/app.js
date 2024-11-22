const express = require("express")
const connect = require("./Config/db")
const BookRouter = require("./Routes/bookRoutes")
const UserRouter = require("./Routes/UserRoutes")

const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))




app.use("/book",BookRouter)
app.use("/user",UserRouter)




app.listen(8080,()=>{
    connect()
    console.log("Server is Running on Port 8080")
})

