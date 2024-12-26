const { Router } = require("express")
const isAuth = require("../Middleware/isAuth")
const BlogModel = require("../Model/BlogSchema")
const BlogRouter = Router()


BlogRouter.post("/add",isAuth,async(req,res)=>{
    try {
        let data = await BlogModel.create(req.body)
        res.send(data)
    } catch (error) {
        
    }
})


BlogRouter.get("/allBlogs",async(req,res)=>{
    try {
        let data = await BlogModel.find().populate("userId","email username")
        res.status(200).send(data)
    } catch (error) {
        
    }
})

BlogRouter.get("/myBlogs",isAuth,async(req,res)=>{
    try {
        let data = await BlogModel.find({userId : req.body.userId}).populate("userId","email username")
        res.status(200).send(data)
    } catch (error) {
        
    }
})

BlogRouter.get("/allBlogs/:id",async(req,res)=>{
    try {
        const {id} = req.params
        let data = await BlogModel.findById(id).populate("userId","email username");
        res.status(200).send(data)
    } catch (error) {
        
    }
})


BlogRouter.patch("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params
        let data = await BlogModel.findById(id)
        let a = data.like + 1
        let d = await BlogModel.findByIdAndUpdate(id,{like : a})
        res.status(200).send({d})
    } catch (error) {
        
    }
})


module.exports = BlogRouter