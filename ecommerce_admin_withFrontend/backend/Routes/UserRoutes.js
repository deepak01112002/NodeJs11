const {Router} = require("express")
const jwt = require("jsonwebtoken")
const UserModel = require("../Model/UserModel")

const UserRouter = Router()

const secret = 'Deepak'

UserRouter.get("/all",async(req,res)=>{
    let data = await UserModel.find()
    res.send(data)
})

UserRouter.post("/register",async(req,res)=>{
    const {username,email,password,role,secretKey} = req.body
    try {
        // let data = await new UserModel({username,email,password,role})
        // await data.save()
        if( role == 'admin' && secretKey != secret){
            return res.send({msg : "Unauthorised !!"})
        }
        let data = await UserModel.create({username,email,password,role})
        res.status(200).send({msg : "User Registered Successfully"})
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        let user = await UserModel.findOne({email : email})
        if(!user){
          return res.send({msg : "User not Registered"})
        }
        if(user.password != password){
            return res.send({msg : "Wrong Password"})
        }
        const token = jwt.sign({userId : user._id, role : user.role},"nodejs")
        res.send({msg : "User Login Successfull", token : token})
    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})







module.exports = UserRouter