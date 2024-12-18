

const {Router} = require("express")
const UserModel = require("../Model/user.Model")
const passport = require("passport")
const isauth = require("../Middleware/isauth")

const UserRouter = Router()






UserRouter.get("/",(req,res)=>{
    res.render("signup.ejs")
})

UserRouter.post("/",async(req,res)=>{
    try {
        let data = req.body
        let ans = await UserModel.create(data)
        res.status(200).json(ans)
    } catch (error) {
        res.status(501).send({err : error.message})
    } 
})

UserRouter.get("/login",(req,res)=>{
    res.render("login.ejs")
})

UserRouter.get("/home",isauth,(req,res)=>{
    res.render("home.ejs")
})

UserRouter.post("/login",passport.authenticate('local'),async(req,res)=>{
    // return res.redirect("/user/home")
    res.status(200).send({msg : "user Login successfull"})
})


module.exports  = UserRouter