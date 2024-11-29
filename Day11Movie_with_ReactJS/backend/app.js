const express  = require("express")
const connect = require("./Config/db")
const cors = require("cors")
const MovieRouter = require("./Routes/MovieRoute")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/movie",MovieRouter)

app.listen(8080,()=>{
    connect()
    console.log("Server started at 8080")
})