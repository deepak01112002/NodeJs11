const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const BookModel = require("../Model/bookSchema")
const addBook = require("../Controller/BookController")

const BookRouter = express.Router()

const s = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"../public/assets"))
    },
    filename : (req,file,cb)=>{
       cb(null,file.originalname)
    }
}) 

const Data = multer({storage : s})



BookRouter.get("/",(req,res)=>{
    res.render("index.ejs")
})

BookRouter.post("/addBook",Data.single("image"),addBook)

BookRouter.get("/books",async(req,res)=>{
    let data = await BookModel.find()
    res.render("allBooks.ejs",{data})
})

BookRouter.get("/delete/:id",async(req,res)=>{
    const {id} = req.params
    const data = await BookModel.findById(id);
    if(data.image){
       const image_path = path.join(__dirname,"/public/assets", data.image) 
       if(fs.existsSync(image_path)){
         fs.unlinkSync(image_path)
       }
    }
   await BookModel.findByIdAndDelete(id)
    res.redirect("/books")
})

BookRouter.get("/edit/:id",async(req,res)=>{
    const {id} = req.params
    const data = await BookModel.findOne({_id : id})
    res.render("editForm.ejs",{data})
})

BookRouter.post("/edit/:id",Data.single("image"),async(req,res)=>{
    const {id} = req.params
    const data = await BookModel.findById(id);
    if(data.image){
        let image_path = path.join(__dirname,"/public/assets",data.image)
        if(fs.existsSync(image_path)){
            fs.unlinkSync(image_path)
        }
    }
     await BookModel.findByIdAndUpdate(id,{
        ...req.body,
        image : req.file.filename
     })
    res.redirect("/books")
})


module.exports = BookRouter