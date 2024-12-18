const express = require("express")
const connection = require("./Config/db")
const UserRouter = require("./Routes/userRoute")
const session = require("express-session")
const passport = require("passport")
const cors  = require("cors")
const auth = require("./Middleware/passportauth")
const app = express()
app.use(cors())
app.use(express.json())

app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))

app.use(session({secret : "lsjslkfsjlkfjsa"}))
app.use(passport.initialize())
app.use(passport.session())
auth(passport)


app.use("/user",UserRouter)

app.listen(8080,()=>{
    connection()
    console.log('server started')
})