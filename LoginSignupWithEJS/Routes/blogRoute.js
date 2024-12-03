const express = require("express")
const isAuth = require("../Middleware/isAuth")

const BlogRouter = express.Router()


BlogRouter.get("/",isAuth,(req,res)=>{
    res.render("Blog.ejs")
})

module.exports = BlogRouter