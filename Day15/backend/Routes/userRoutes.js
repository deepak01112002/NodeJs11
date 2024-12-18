const {Router} = require("express")
const userModel = require("../Model/userSchema")

const UserRouter = Router()

UserRouter.post("/register",async(req,res)=>{
    try {
       let {username,password,email} = req.body
       let data = {
          username : username,
          password : password,
          email :  email
       }
       await userModel.create(data)
       res.status(200).send({msg : "User Registered Successfully"})

    } catch (error) {
        res.status(501).send({msg : error.message})
    }
})



module.exports  = UserRouter