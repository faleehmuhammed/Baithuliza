import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import './Cart.css'
import { BsTrash } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { FiMinus} from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";




function Cart() {
    const {Users,AdminTrue,Cartcount} = useContext(DataContext)
    const [adminTrue,setadminTrue]=AdminTrue
    const [cartCount, setcartCount] = Cartcount
    const [cartItems, setcartItems] = useState([])
    const [user, setuser] = Users
    const [total, settotal] = useState()
    const [re, setre] = useState(false)
    const getCartItems = async () => {
        console.log('context user is ',user);
        // console.log('fn Triggered');
        await axios.get('http://localhost:8008/cart').then((res) => {
            console.log('cart res is',res);
            setcartItems(res.data.cartProducts)
            settotal(res.data.total);
            setcartCount(res.data.cartCount)
           
            // setuser(res.data.user)

        })
    }
    const removeItems = (cartid, proId, quantity) => {

        axios.post('http://localhost:8008/remove-cart-product', { cartid, proId, quantity }).then((response) => {
            // console.log(response);
            setre(true)
            setre(false)
        })
    }
    const changeQuantity=(cart,product,count,quantity)=>{
    //    prompt('enter age')
    //    console.log(cart,product,count,quantity);
       axios.post('http://localhost:8008/change-product-quantity',{cart,product,count,quantity}).then((res)=>{
        //    console.log(res);
           setre(true)
           setre(false)
           
       })
    }
    const wishListItems=()=>{
        axios.get('http://localhost:8008/wishlist').then((response)=>{
            console.log('wish list items are',response);
        })
       
    }
    
    useEffect(() => {
        setadminTrue(false)
        getCartItems()
        wishListItems()
        
    }, [re])
    return (
        <div style={{width:'100%',display:'flex'}} className="main-cart">
            <div style={{width:'50%'}} className="wishlist">
               <h1>Wishlist</h1>
            </div>
            {cartItems.length !==0 ? <div style={{width:'50%'}} className='Cart'>
          {user&& <h1>My Cart</h1>}  
          <h1> <BiShoppingBag/> My Cart</h1>
          
            
            

            {
                cartItems.map((i) => (
                    <div>
                    <div className='man'  >
                        <div className="top">
                            <img src={i.product.url} height='100px' width='80px' alt="" />
                            <h3>{i.product.Price}</h3>
                            
                        </div>
                        <div className="bottom">
                            <button onClick={()=>changeQuantity(i._id,i.product._id,-1,i.quantity)} > <FiMinus size={20} /> </button>
                            <span style={{color:'#333'}} >{i.quantity}</span>
                            <button onClick={()=>changeQuantity(i._id,i.product._id,1,i.quantity)}><BsPlus size={20} /></button>
                        </div>
                        <div className="remove">
                            <button  onClick={() => removeItems(i._id, i.product._id, i.quantity)} ><BsTrash size={20}/></button>
                        </div>
                    </div>
                    
                    
                    </div>

                    
                ))
            }
 <hr style={{position:'absolute',right:'5%'  }}   width='30%' />
            
            <div  className="total">
           
                        <h2>Total:{total}</h2>
                    </div>
                    <div className="order">
                        
                        <Link to='place-order' ><button className='btn btn-success' >Place Order</button></Link>
                    </div>

            {/* {cartItems&&cartItems.map((i)=>{
                     return (
                         <>
                         <h3>{i.Description}</h3>
                         <h3>{i.Name}</h3>
                         </>
                     )
                 })} */}



        </div> : <div style={{marginTop:'25%'}} className="no-item"><h1>Sorry no items in cart</h1> </div> }
        
        </div>
    )
}

export default Cart
