import React, { useState } from 'react'

function Signup() {
    const [state,setState]  = useState({
        username : "",
        email : "",
        password : ""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setState({...state,[name] : value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`http://localhost:8080/user`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(state)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
             <input type="text" name='username' placeholder='Username' onChange={handleChange} />
             <input type="text" name='email' placeholder='Email ID' onChange={handleChange} />
             <input type="text" name='password' placeholder='Password' onChange={handleChange} />
             <input type="submit" />
        </form>
    </div>
  )
}

export default Signup