const mongoose = require("mongoose")

const ProductCategorySchema = mongoose.Schema({
    name : {type : String,require : true},
})

const ProductCategoryModel = mongoose.model("productsCategory",ProductCategorySchema)


module.exports = ProductCategoryModel