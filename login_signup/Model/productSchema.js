const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title  : String,
    desc : String,
    price : String,
    image : String,
    rating : String,
    category : String
})


const ProductModel = mongoose.model("product", productSchema)


module.exports = ProductModel