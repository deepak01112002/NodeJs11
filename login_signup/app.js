const express = require("express");
const connection = require("./Config/db");
const UserRouter = require("./Routes/UserRoutes");
const cors = require("cors")
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(cors())

app.use("/", UserRouter)

app.listen(process.env.PORT,()=>{
    connection()
    console.log(`Server is started at port ${process.env.PORT}`)
})