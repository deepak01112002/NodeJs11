

const express = require("express")
const {hemang,addBook} = require("../Controller/BookController")

const BookRouter = express.Router()

BookRouter.get("/",hemang)

BookRouter.post("/addBook",addBook)


module.exports = BookRouter