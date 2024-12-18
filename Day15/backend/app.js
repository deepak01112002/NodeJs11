const express = require("express");
const connection = require("./Config/db");
const cors = require("cors")
const UserRouter = require("./Routes/userRoutes");
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())


app.use("/user",UserRouter)

app.listen(process.env.PORT,()=>{
   connection()
   console.log(`Server started on ${process.env.PORT}`)
})