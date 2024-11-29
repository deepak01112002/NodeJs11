const express = require("express")
const connect = require("./Config/db")
const cors = require("cors")
const BookRouter = require("./Router/BookRouter")
const app = express()

app.use(cors())
app.use(express.json())



app.use("/",BookRouter)


app.listen(8080,()=>{
    connect()
    console.log("Server is running at port 8080")
})