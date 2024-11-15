const express = require("express")
const connect = require("./config/server")
const BookModel = require("./Model/bookSchema")

const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.get("/",async(req,res)=>{
    let Books = await BookModel.find()
    res.render("index.ejs",{Books : Books})
})


app.get("/addBook",(req,res)=>{
    res.render("BookForm.ejs")
})


app.post("/addBook",async(req,res)=>{
     await BookModel.create(req.body)
     res.redirect("/")
})


app.get("/deleteBook/:id",async (req,res)=>{
    let {id} = req.params
    await BookModel.findByIdAndDelete(id)
    res.redirect("/")
})

app.get("/editBook/:id",async(req,res)=>{
    let {id} = req.params;
    let data = await BookModel.findById(id)
    
    res.render("editForm.ejs",{data : data})
})




app.listen(8080,()=>{
    connect()
    console.log("Server is connected !!!")
})