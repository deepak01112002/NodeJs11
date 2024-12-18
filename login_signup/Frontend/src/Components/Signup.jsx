import React, { useState } from 'react'
import axios from "axios"
function Signup() {
    const [state,setState] = useState({
        username : "",
        password : "",
        email : ""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setState({...state,[name] : value})
    }

    const handleSubmit = (E)=>{
        E.preventDefault()
        axios.post("http://localhost:8080/register",state)
        .then((Res)=>{
            console.log(Res)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder='username' onChange={handleChange} />
            <input type="text" name='password' placeholder='password' onChange={handleChange} />
            <input type="text" name='email' placeholder='email' onChange={handleChange} />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Signup