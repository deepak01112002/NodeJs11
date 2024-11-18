const express = require("express")
const connect = require("./Config/db")
const BookModel = require("./Model/bookSchema")

const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})


app.post("/addBook",async (req,res)=>{
     await BookModel.create(req.body)
     res.redirect("/books")
})

app.get("/books",async(req,res)=>{
    let data = await BookModel.find()
    res.render("allBooks.ejs",{data})
})


app.get("/delete/:id",async(req,res)=>{
    const {id} = req.params
    await BookModel.findByIdAndDelete(id)
    res.redirect("/books")
})


app.get("/edit/:id",async(req,res)=>{
    const {id} = req.params
    const data = await BookModel.findOne({_id : id})
    res.render("editForm.ejs",{data})
})

app.post("/edit/:id",async(req,res)=>{
    const {id} = req.params
    await BookModel.findByIdAndUpdate(id,req.body)
    res.redirect("/books")
})


app.listen(8080,()=>{
    connect()
    console.log("Server is Running on Port 8080")
})

