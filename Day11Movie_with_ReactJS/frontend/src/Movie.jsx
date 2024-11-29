import React, { useEffect } from 'react'

function Movie() {

    useEffect(()=>{
       fetch(`http://localhost:8080/movie/all`)
       .then((Res)=>Res.json())
       .then((res)=>{
        console.log(res)
       })
       .catch((err)=>{
        console.log(err)
       })
    },[])
  return (
    <div>

    </div>
  )
}

export default Movie