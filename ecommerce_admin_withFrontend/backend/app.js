const express = require("express");
const connection = require("./Config/db");
const cors = require("cors")
const UserRouter = require("./Routes/UserRoutes");
const ProductCategoryRoute = require("./Routes/ProductCategoryRoutes");
const ProductSubCatRoute = require("./Routes/ProductSubCatRoutes");

const app = express()
app.use(cors())
app.use(express.json())

app.use("/user",UserRouter)
app.use("/product/category", ProductCategoryRoute)
app.use("/product/subCat", ProductSubCatRoute)

app.listen(8080,()=>{
    console.log('Port Running on 8080');
    connection()
})



