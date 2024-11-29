const express = require("express")
const MovieModel = require("../Model/MovieModel")
const MovieRouter = express.Router()



MovieRouter.post("/add",async(req,res)=>{
    try {
        let data = await MovieModel.create(req.body)
        res.status(200).send({msg : "Movie Added Successfully", data : data})
    } catch (error) {
        res.status(401).send({msg : error.message})
    }
})

MovieRouter.get("/all",async(req,res)=>{
    try {
        let data = await MovieModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(401).send({msg : error.message})
    }
})





module.exports = MovieRouter