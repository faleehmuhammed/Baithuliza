import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import './Header.css'
import { BsBasket, BsCart4 } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Badge, Dropdown, DropdownButton } from 'react-bootstrap'

function Header() {

    const { Users, Cartcount, AdminTrue,IsLoaged } = useContext(DataContext)
    const [adminTrue, setadminTrue] = AdminTrue
    const [user, setuser] = Users
    const [cartCount, setcartCount] = Cartcount
    const [isLoaged,setisLoaged]=IsLoaged
    const [refresh, setrefresh] = useState(false)
    const [currentUser, setcurrentUser] = useState()
    const notify = () => toast("successfuly Logout");


    const logout = () => {
        notify()
        axios.get('http://localhost:8008/signout').then((res) => {
            console.log(res);
            if (res.data.message = 'logout success') {
                localStorage.removeItem('user')
                setisLoaged(false)
                
            } else {
                alert('something went wrong')
            }

            // res.data.message = 'logout success' ?  localStorage.removeItem('user') : alert('something went wrong')

        })
    }
    const reload = () => {
        setrefresh(true)
        setrefresh(false)
    }

    useEffect(() => {
        const it =localStorage.getItem('user')
        it ? setisLoaged(true) :setisLoaged(false)
        setcurrentUser(it);
    }, [refresh,isLoaged])
    return (
        <div className='header'>
            <div className="left">
                <h1>E-COMMERCE</h1>
            </div>
            <div className="right">
                {isLoaged &&
                <>
                <Link to='/'> <button>Home</button> </Link>
                <Link to='/profile'> <button>Profile</button> </Link>
                </>
}
                <div style={{ marginTop: '15px' }} className="cartIcon">
                    <Link style={{ textDecoration: 'none', color: '#fff' }} to='/cart' >  <h2 > <BsCart4 /> <span style={{ fontSize: '30px' }} >{ isLoaged && cartCount} </span>  </h2> </Link>
                </div>
                <DropdownButton variant='dark' id="dropdown-basic-button" title={currentUser ? currentUser : 'Login'}>
                    <Dropdown.Item  >{isLoaged ? <h5 onClick={logout}> Logout </h5> : <Link style={{ textDecoration: 'none' }} to='/About' > <h5 onClick={reload}  >Login</h5></Link>}</Dropdown.Item>
                    <Dropdown.Item ><h5> Signup </h5></Dropdown.Item>

                </DropdownButton>
                {/* <button onClick={notify}>Logout</button> */}
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
            </div>
        </div>
    )
}

export default Header
