import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Admin.css'
import {useHistory} from 'react-router-dom'
import { DataContext } from '../../../Context/Context'

function Admin() {
    const { AdminTrue } = useContext(DataContext)
  const [adminTrue, setadminTrue] = AdminTrue
    const history = useHistory()
    const [input, setinput] = useState({
        Email:'',
        password:''
    })
    const [message, setmessage] = useState()

     const handleChange =(e)=>{
         setmessage('')
    setinput({...input,[e.target.name]:e.target.value})
     }
     const handleClick =()=>{
        axios.post('http://localhost:8008/admin/signin',input).then((res)=>{
            console.log(res);
            setadminTrue(res.data.admin)
            setmessage(res.data.message)
            res.data.Signed && history.push('/adminhome')
        })
     }

     useEffect(() => {
        localStorage.removeItem('user')

     }, [])
       
    return (
        <div>
            
    
            <div className="main">
            
            <h1>admin page</h1>
                <div className="sub">
                <h2>{message}</h2>
                    <input type="text" placeholder='email' name='Email' onChange={handleChange} />
                    <br />
                    <input type="password" placeholder='password' name='password' onChange={handleChange} />
                    <br />
                    <button onClick={handleClick} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Admin
