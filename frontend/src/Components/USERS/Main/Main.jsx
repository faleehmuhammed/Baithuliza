import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import Modal from '../Addproduct/Addproduct'
import { BsBasket } from "react-icons/bs";
import './Main.css'
import { Card, Carousel, Dropdown, DropdownButton } from 'react-bootstrap'
import Hero from '../../../Hero-img.jpg'
import { BsCartPlus } from "react-icons/bs";
import MidBanner from '../../../about-banner.jpg'
import CardS from '../Card/Card'



function Main() {
    const history = useHistory()
    
    const { State, AdminTrue, Users, Cartcount } = useContext(DataContext)
    // const [state,setstate]=State
    const [adminTrue, setadminTrue] = AdminTrue
    const [state, setstate] = useState([])
    const [user, setuser] = Users
    // const [contact,setcontact]=Users
    const [cUser, setcUser] = useState('')
    const [cartCount, setcartCount] = Cartcount
    const [res, setres] = useState(false)


    const getcurrentUser = () => {
        const currentUser = localStorage.getItem('user');
        setcUser(currentUser);

    }
    const getData = () => {
        console.log('getdata working');
        axios.get(process.env.REACT_APP_API_URL).then((response) => {
            console.log(response.data);
            setcartCount(response.data.cartCount);
            setstate(response.data.products)
        })
    }
    
    useEffect(() => {
        setadminTrue(false)
        getData()
        getcurrentUser()
        
    }, [res])

    return (
        <div className='parent'>
            
            <div className="Hero">
                <div className="hero-img">
                    <img src={Hero} alt="" />
                </div>
                <div className="hero-content">
                    <div className="title">
                        <h1>   <b>Products </b> </h1>
                        <h1>   <b> Getting Better Now </b> </h1>
                        <p>Bag Quality Products From Most Trusted Dealers</p>
                    </div>
                </div>
            </div>

            
 
            
            <div className='holder'>
                {/* <Link to='/add-product' > <button>Add Product</button></Link> */}

                

                <div className="menu">
                    {/* {OpenModal && <Modal OpenModal={OpenModal} setOpenModal={setOpenModal} />} */}




                </div>

                <div style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}} className="hr">
                <h1 className="menuTitle">Latest Products</h1>
                <hr width='15%' />
                </div>

                <div className="map-items">
                    {
                        state.map((i) => {
                            return (

                       
                                <CardS setres={setres} i={i} />

                            )
                        })
                    }
                </div>





            </div>

            <div className="mid">
                <div className="mid-content">
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi maiores repellat .</h1>
                </div>
                <div className="mid-hero">
                <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src={MidBanner}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item  interval={1000}>
    <img
      className="d-block w-100"
      src={MidBanner}
      alt="Second slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={MidBanner}
      alt="Third slide"
    />
    
  </Carousel.Item>
</Carousel>
                </div>

            </div>






            {/* {
                [...Array(100)].map((_,i)=>{
                    <button onClick={()=>alert(i)}>{i+1}</button>
                })
            } */}



        </div>
    )
}

export default Main
