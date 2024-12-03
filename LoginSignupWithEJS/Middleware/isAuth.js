 
 const isAuth = (req,res,next)=>{
    console.log(req.cookies)
    let data = req.cookies.userId
    if(data){
       next()
    }else{

        res.redirect("/login")
        // res.status(501).send({msg : "Login First !!"})
    }
 }

 module.exports = isAuth