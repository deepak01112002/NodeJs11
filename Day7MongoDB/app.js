const express = require("express")
const connect = require("./Config/server")
const StudentModel = require("./Config/classSchema")


const app = express()


app.use(express.json())





app.post("/addData",async (req,res)=>{
      await StudentModel.create(req.body)
      res.send("User registered Successfully")
})

app.get("/allData",async (req,res)=>{
     let data = await StudentModel.find()
     res.send(data)
})



app.listen(8080,()=>{
    connect()
    console.log("Server is running at 8080")
})