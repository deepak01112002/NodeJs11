import React, { useEffect, useState } from 'react'

function Home() {
    const [cat,setCat] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:8080/product/category/all`)
        .then((Res)=>Res.json())
        .then((Res)=>{
            setCat(Res);
            
        })
        .catch((Err)=>console.log(Err))
    },[])
  return (
    <div>
        <form action="">
             <input type="text" placeholder='Title' />
             <input type="text" placeholder='Description' />
             <input type="text" placeholder='Price' />
             <input type="text" placeholder='Image URL'/>
             <select name="" id="">
                <option value="">Select the Category</option>
                {
                    cat.map((el)=>(
                         <option value={el._id}>{el.name}</option>
                    ))
                }
             </select>

        </form>
    </div>
  )
}

export default Home