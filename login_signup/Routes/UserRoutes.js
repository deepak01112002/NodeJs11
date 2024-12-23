const {Router} = require("express")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const UserModel = require("../Model/userSchema")
const nodemailer = require("nodemailer")
require('dotenv').config()
const UserRouter = Router()

let otpStore = {
   
}

UserRouter.post("/register",async(req,res)=>{
    try {
        bcrypt.hash(req.body.password,5,async (err,hash)=>{
            if(err){
              return res.send({msg : err})
            }
            let obj = {
                username : req.body.username,
                email : req.body.email,
                password : hash
            }
            let data = await UserModel.create(obj)

            res.status(200).send({msg : "User registered successfully"})
        })
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})


UserRouter.post("/login",async(req,res)=>{
     const {email,password} = req.body
    try {
       let user = await UserModel.findOne({email})
       console.log(user);
       
       if(user){
         bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token  = jwt.sign({userID : user._id, username : user.username}, process.env.SECRET)
                res.status(200).send({msg : "User Logged in successfully",token})
            }else{
                res.status(501).send({msg : "Incorrect Passwrod"})
            }
         })
       }else{
          res.status(501).send({msg : "User not registered"})
       }
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})


UserRouter.post("/changePassword",async(req,res)=>{
    const {email,oldPassword,newPassword,confirmPassword}  = req.body;
    try {
        let user = await UserModel.findOne({email : email})
        
        if(!user){
            return res.status(501).send({msg : "User not Registered"})
        }
        bcrypt.compare(oldPassword,user.password,async(err,result)=>{
            if(result){
                
                if(newPassword == confirmPassword){
                      bcrypt.hash(newPassword,5,async (err,hash)=>{
                        let data = await UserModel.findOneAndUpdate({email : email},{password : hash})
                        res.status(200).send({msg : "Password Changed !!1"})
                      })
                }else{
                    res.status(501).send({msg : "Confirm Password is Not Similar"})
                }

            }else{
                res.status(501).send({msg : "Incorrect Passwrod"})
            }
        })
    } catch (error) {
        res.status(400).send({msg : error.message})
    }
})


UserRouter.post("/forgotPassword",async(req,res)=>{
    const {email} = req.body;
    try {
        let user = await UserModel.findOne({email})
        if(user){
            let otp = Math.round(Math.random()*10000)
            otpStore[email] = otp
            console.log(otpStore);
            
           const transpoter = nodemailer.createTransport({
                service : "gmail",
                auth : {
                    user : "hemanagsolanki10@gmail.com", 
                    pass : "pixdctsztdggwhpy"
                }
           }) 
           let mailOption = {
               from : "hemanagsolanki10@gmail.com",
               to : email,
               subject : "OTP for Password Reset",
               text : `Your otp for password reset is ${otp}`
           }
           transpoter.sendMail(mailOption,(error,info)=>{
              if(error){
                 return res.status(400).send({msg : "unable to send OTP"})
              }
              res.status(200).send({msg : "OTP Sended Successfully"})
           })
        }else{
            res.status(500).send({msg : "Email Not Registered"})
        }
    } catch (error) {
         
    }
})


UserRouter.post("/resetPassword",async(req,res)=>{
       const {email,otp,newPassword} = req.body
       console.log(otpStore)
    try {
        if(otpStore[email]  == otp){
            let hashedPassword = await bcrypt.hash(newPassword,10)
            let data = await UserModel.findOneAndUpdate({email : email}, {password : hashedPassword})
            otpStore[email] = ""
            res.send({msg : "Password Changed Successfully",data})
        }else{
            res.send({msg : "OTP Incorrect"})
        }
    } catch (error) {
        
    }
})






module.exports = UserRouter