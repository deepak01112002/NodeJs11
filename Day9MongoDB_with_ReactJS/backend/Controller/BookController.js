const BookModel = require("../Model/BookModel")


const hemang = async(req,res)=>{
    try {
        let books = await BookModel.find()
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send({err : error.message})
    }
}

const addBook = async(req,res)=>{
    try {
       let a = await BookModel.create(req.body)
       res.send({msg : "Book Added Successfully" , data : a})
    } catch (error) {
        res.send({err : error.message})
    }
}


module.exports = {hemang,addBook}