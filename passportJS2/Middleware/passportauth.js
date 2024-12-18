const UserModel = require("../Model/user.Model")
const LocalStrategy = require("passport-local").Strategy

const auth = (passport)=>{
    passport.use(new LocalStrategy(
        {usernameField : "email"},
        async(email,password,done)=>{
          let user = await UserModel.findOne({email})
          if(!user){
            return done(null,false,{msg : "User not found"})
          }
          if(user.password != password){
            return done(null,false,{msg : "Password Incorrect"})
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
}

module.exports = auth