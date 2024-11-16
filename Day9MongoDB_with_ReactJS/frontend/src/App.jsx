import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [state,setState] = useState({
     bookName : "",
     des : "",
     author : "",
     image : "",
     price : ""
  })
  const handleChange = (e)=>{
     let {name,value} = e.target
     setState({...state, [name] : value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
     fetch(`http://localhost:8080/addBook`,{
      method : "POST",
      headers : {
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(state)
     })
     .then((Res)=>Res.json())
     .then((Res)=>console.log(Res))
  }
  
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
          <input type="text"  placeholder='Book Name' name='bookName'  onChange={handleChange}/>
          <input type="text" placeholder='Description' name='des'  onChange={handleChange}/>
          <input type="text" placeholder='Author' name='author'  onChange={handleChange}/>
          <input type="text" placeholder=' Image URL' name='image'  onChange={handleChange}/>
          <input type="text"  placeholder='Price' name='price'   onChange={handleChange}/>
          <input type="submit" />
      </form>
    </>
  )
}

export default App
