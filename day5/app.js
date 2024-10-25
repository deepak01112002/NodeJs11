const express = require("express")


const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))

let arr = [];

app.get("/",(req,res)=>{
    res.render("index.ejs")
})


app.post("/",(req,res)=>{
    arr.push({...req.body,id : arr.length+1 + Date.now()})
    console.log(arr)
    res.redirect("/data")
})


app.get("/data",(req,res)=>{
    res.render("data.ejs",{arr :arr})
})

app.get("/data/:id",(req,res)=>{
    let a = req.params.id
    arr = arr.filter((el)=>el.id != a)
    res.redirect("/data")
})

app.get("/edit/:id",(req,res)=>{
    let a = arr.filter((el)=>el.id == req.params.id)
    console.log(a)
    res.render("edit.ejs",{data : a})
})

app.post("/edit/:id",(req,res)=>{
    let a = req.params.id;
    arr = arr.map((el)=>{
        if(el.id == a){
            return {...el,...req.body}
        }else{
            return el;
        }
    })
    res.redirect("/data")
})


app.listen(8080,()=>{
    console.log("Server running on Port 8080")
})