const {Router} = require("express");
const UserModel = require("../Model/user.Model");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const UserRouter = Router();

passport.use(new LocalStrategy(
    async(username,password,done)=>{
       let user = await UserModel.findOne({username})
       if(!user){
          return done(null,false,{msg : "User not Registered"})
       }
       if(user.password != password){
         return done(null,false,{msg : "Incorrect Password"})
       }
       return done(null,user)
    }
 ))
 
 
 passport.serializeUser((user,done)=>{
     done(null,user.id)
 })
 
 passport.deserializeUser(async(id,done)=>{
     let user = await UserModel.findById(id)
     done(null,user)
 })

UserRouter.get("/",(req,res)=>{
    res.render("signup.ejs")
})

UserRouter.post("/",async(req,res)=>{
    try {
        let data = req.body
        let ans = await UserModel.create(data)
        res.status(200).send({data : ans, msg : "Register Successfull"})
    } catch (error) {
        res.status(501).send({err : error.message})
    } 
})

UserRouter.get("/login",(req,res)=>{
    res.render("login.ejs")
})
UserRouter.get("/home",(req,res)=>{
    res.render("home.ejs")
})

UserRouter.post("/login",passport.authenticate("local",{successRedirect : "/user/home"}),async(req,res)=>{
})



module.exports = UserRouter