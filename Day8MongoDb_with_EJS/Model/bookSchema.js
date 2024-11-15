const mongoose = require("mongoose")


const BookSchema = mongoose.Schema({
    bookName : String,
    des : String,
    author : String,
    price : Number
})

const BookModel = mongoose.model( "book" , BookSchema)


module.exports = BookModel