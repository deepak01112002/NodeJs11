import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [state,setState] = useState({
        username : "",
        email : "",
        password : ""
    })
    const handleChange = (e)=>{
        setState({...state,[e.target.name] : e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`http://localhost:8080/user/register`,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify(state)
        })
        .then((Res)=>Res.json())
        .then((res)=>{
            
            if(res.msg == 'User Registered Successfully'){
                alert(res.msg)
                navigate("/")
            }
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
  return (
    <div className="wrapper signUp">
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="username" placeholder="Enter your name"  onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input type="text" id="name" name="email" placeholder="Enter your mail"  onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter you password" onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
          <h2 align="center" class="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
}
