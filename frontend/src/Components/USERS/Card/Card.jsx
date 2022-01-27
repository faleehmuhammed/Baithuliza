import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import './Card.css'
function CardS({i,setres}) {
    
    const addItem = (itm) => {
         console.log(itm);
        axios.get(`http://localhost:8008/add-to-cart/${itm}`).then((resp) => {
            console.log(resp);
            setres(true)
            setres(false)
        })

    }

    const wishList =(itm)=>{
        
        axios.post(`http://localhost:8008/add-to-wishlist/${itm}`).then((response)=>{
            console.log(response);
           response&& toast(response.data.message)
            
        })
    }
    const sendChat =(id)=>{
      console.log(id);
      // axios.get(`http://localhost:8008/chat${id}`)
    }
    
    return (
        
            <div className="card-item">
                <ToastContainer
                    position="top-center"
                    autoClose={2001}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
    
    <div  className="photo">
      <div style={{width:'200px',display:'flex',alignItems:'center'}} className="photo-tic">
      <img width='200px' src={i.url} />
      </div>
      
    </div>
    <div className="description">
      <h2>{i.Name}</h2>
      <h4>{i.Category}</h4>
      <h1>&#8377; {i.Price}</h1>
      <p>
        Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo
        planter with a blue &amp; red ribbom and butterfly pick.
      </p>
      <p>upload :{i.CreatedBy}</p>
      {/* <Link to={`/chat/${i.CreatedBy}`}> <button >chat</button></Link> */}
      <button onClick={()=>addItem(i._id)} className=' bg-success' >Add to Cart</button>
      <button onClick={()=>wishList(i._id)} className=' bg-warning' >Wishlist</button>
    </div>
  </div>
        
    )
}

export default CardS
