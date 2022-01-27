import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Stripe from '../Stripe/Stripe';
import { FaCcVisa,FaCcAmazonPay,FaCcMastercard,FaCcPaypal,FaCcStripe } from "react-icons/fa";
import './Placeorder.css'
import { DataContext } from '../../../Context/Context';
import {useHistory} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';





function Placeorder() {
  const navigate =useHistory()
    const [data, setdata] = useState()
    const {AdminTrue} = useContext(DataContext)
    const [adminTrue,setadminTrue]=AdminTrue
    const [input, setinput] = useState({
      name:'',
      email:'',
      address:''


    })
    const placeOrder =()=>{
        axios.get('http://localhost:8008/place-order').then((response)=>{
            console.log(response);
            setdata(response.data)
        })
       }
    const placeOrders =(meth)=>{
        axios.post('http://localhost:8008/place-order',{meth,order:input}).then((response)=>{
            console.log(response);
            response.data.codSuccess && navigate.push('/order-success')
        })
       }
       const handleChange =(e)=>{
          setinput({...input,[e.target.name]:e.target.value})
       }
    useEffect(() => {
        placeOrder()  
        setadminTrue(false)
    }, [])
    return (
        <div className="hei">
        <div className="contact">
      <div
        className="leftSide">
            <div className="Contents">
          <h1>CheckOut Here</h1>
          
            {data &&<h2>Total is : {data&&data.total}</h2>
}
            <h4>Cart Items : {data&&data.cartCount}</h4>
            
               
            </div>
            <div className="payment">
            
            </div>
      </div>
      <div className="rightSide">
        
        <h1>Checkout Address</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input onChange={handleChange} name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} name="email" placeholder="Enter email..." type="email" />
          
          <label htmlFor="message">Address</label>
          <textarea
           onChange={handleChange}
            rows="6"
            placeholder="Address..."
            name="address"
            required
          ></textarea>
          
          
          
        </form>
        <div style={{display:'flex',alignItems:'baseline', justifyContent:'space-evenly'}} className="checkout-btns">
        <button className='btn btn-success' style={{height:'35px' }}  onClick={()=>placeOrders('COD')} >Cash On Delivery</button>
        {/* <Stripe data={data} /> */}
        </div>
        <div className="cards">
          <h1><FaCcVisa/></h1>
          <h1><FaCcStripe/></h1>
          <h1><FaCcMastercard/></h1>
          <h1><FaCcAmazonPay/></h1>
          <h1><FaCcPaypal/></h1>
          
          
      </div>
      </div>
    </div>
      
    </div>
    )
}

export default Placeorder


