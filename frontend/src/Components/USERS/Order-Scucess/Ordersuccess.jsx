import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../Context/Context'

function Ordersuccess() {
    const {State,AdminTrue,Users}= useContext(DataContext)
     const [data, setdata] = useState()
     const [adminTrue,setadminTrue]=AdminTrue
    useEffect(() => {
        axios.get('http://localhost:8008/orders').then((res)=>{
            console.log(res);
            setdata(res.data)
            setadminTrue(false)
        })
    }, [])
    return (
        <div>
            <h1>Your Order Success</h1>
               <h1>{data&&data.cartCount}</h1>
            {data&&data.orders.map((i)=>{
                return(
                    <>
                    <h1>Order Olaced{i.orderObject.date}</h1>
                    <h1>Payment Method {i.orderObject.paymentMethod}</h1>
                    <h1>Price: {i.orderObject.totalAmount}</h1>
                    <h1>Status :{i.orderObject.status}</h1>
                    </>
                )
            })}
        </div>
    )
}

export default Ordersuccess
