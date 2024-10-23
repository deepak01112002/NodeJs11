const { readFileSync } = require("fs");
const http = require("http");
const path = require("path")




let server = http.createServer((req,res)=>{
    if(req.url == "/"){
        let a = path.join(__dirname,"index.html")
        let data = readFileSync(a,"utf-8")
        res.end(data)
    }else if(req.url == "/aboutpage"){
        res.end("about Page")
    }else if(req.url == "/contact"){
        res.end("contact page")
    }else{
        res.end("Page not Found !!!!")
    }
})


server.listen(5173,()=>{
    console.log("Server runnning on port 8080")
})