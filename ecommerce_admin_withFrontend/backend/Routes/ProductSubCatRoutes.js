const {Router} = require("express")
const isAdmin = require("../Middleware/isAdmin")
const ProductSubCatModel = require("../Model/ProductSubCatModel")

const ProductSubCatRoute = Router()


ProductSubCatRoute.post("/add",isAdmin,async(req,res)=>{
    try {
        let data = await ProductSubCatModel.create(req.body)
        res.status(200).send({msg : "SubCategory added Successfully", data})
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})


ProductSubCatRoute.get("/all",async(req,res)=>{
    try {
        let data = await ProductSubCatModel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})


module.exports = ProductSubCatRoute