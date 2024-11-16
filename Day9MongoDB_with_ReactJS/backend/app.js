const express = require("express")
const connect = require("./Config/db")
const cors = require("cors")
const BookModel = require("./Model/BookModel")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/",async(req,res)=>{
    let books = await BookModel.find()
   res.send(books)
})

app.post("/addBook",async(req,res)=>{
     let a = await BookModel.create(req.body)
     res.send({msg : "Book Added Successfully" , data : a})
})



app.listen(8080,()=>{
    connect()
    console.log("Server is running at port 8080")
})