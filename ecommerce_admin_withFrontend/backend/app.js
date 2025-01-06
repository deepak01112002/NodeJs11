const express = require("express");
const connection = require("./Config/db");
const UserRouter = require("./Routes/UserRoutes");
const ProductCategoryRoute = require("./Routes/ProductCategoryRoutes");

const app = express()
app.use(express.json())

app.use("/user",UserRouter)
app.use("/product/category", ProductCategoryRoute)

app.listen(8080,()=>{
    console.log('Port Running on 8080');
    connection()
})



