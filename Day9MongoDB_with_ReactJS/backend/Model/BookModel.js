const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    bookName : String,
    des : String,
    author : String,
    img : String,
    price : Number
})


const BookModel = mongoose.model( "bookData" , BookSchema)


module.exports = BookModel