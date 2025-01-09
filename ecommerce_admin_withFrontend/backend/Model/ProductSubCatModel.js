const mongoose = require("mongoose")

const ProductSubCatSchema = mongoose.Schema({
    name : {type : String,require : true}
})

const ProductSubCatModel = mongoose.model("productSubCat",ProductSubCatSchema)


module.exports = ProductSubCatModel