const {Router} = require("express")
const ProductCategoryModel = require("../Model/ProductCategoryModel")
const isAdmin = require("../Middleware/isAdmin")

const ProductCategoryRoute = Router()


ProductCategoryRoute.post("/add",isAdmin,async(req,res)=>{
    try {
        let data = await ProductCategoryModel.create(req.body)
        res.status(200).send({msg : "Category added Successfully", data})
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})


ProductCategoryRoute.get("/all",async(req,res)=>{
    try {
        let data = await ProductCategoryModel.find().populate("subCatId");
        res.status(200).json(data)
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})


module.exports = ProductCategoryRoute