import React, { useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from "axios"
function Login() {
    const [state,setState] = useState({
        password : "",
        email : ""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setState({...state,[name] : value})
    }

    const handleSubmit = (E)=>{
        E.preventDefault()
        axios.post("http://localhost:8080/login",state)
        .then((Res)=>{
            console.log(Res)
            let a = jwtDecode(Res.data.token);
            console.log(a);
            localStorage.setItem("token",Res.data.token)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name='password' placeholder='password' onChange={handleChange} />
            <input type="text" name='email' placeholder='email' onChange={handleChange} />
            <input type="submit" />
        </form>
        <span>Change Password ?</span>
    </div>
  )
}

export default Login