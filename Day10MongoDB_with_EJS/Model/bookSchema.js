const mongoose = require("mongoose")


const bookSchema = mongoose.Schema({
    name : String,
    author : String,
    image : String
})

const BookModel = mongoose.model( "book" ,bookSchema)


module.exports = BookModel