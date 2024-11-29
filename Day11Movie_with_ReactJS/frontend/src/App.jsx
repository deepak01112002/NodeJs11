import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movie from './Movie'

function App() {
  const [state,setState] = useState({
     title : "",
     poster : "",
     rating  : ""
  })
  const handleChange = (e)=>{
       
      setState({...state,[e.target.name] : e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    fetch(`http://localhost:8080/movie/add`,{
      method : "POST",
      headers :{
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(state)
    }).then((Res)=>Res.json())
    .then((Res)=>{
      console.log(Res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
         <input type="text" name='title' onChange={handleChange}/>
         <input type="text" name='poster' onChange={handleChange}/>
         <input type="text" name='rating' onChange={handleChange}/>
         <input type="submit" />
      </form>
      <Movie/>
    </>
  )
}

export default App
