const BookModel = require("../Model/bookSchema")

const addBook = async (req,res)=>{ // book/addBook
    await BookModel.create({
       ...req.body,
       image : req.file.filename
    })
    res.redirect("/book/books")
}

module.exports = addBook