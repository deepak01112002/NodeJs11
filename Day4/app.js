const express = require("express")

let app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))

let arr = []

app.get("/",(req,res)=>{
   res.render("index.ejs")
})

app.get("/data",(req,res)=>{
    res.render("Data.ejs",{data : arr})
})


app.post("/home",(req,res)=>{
    arr.push(req.body)
    console.log(arr)
    res.redirect("/data")
})



app.listen(8080,()=>{
    console.log("server is Running on 8080")
})