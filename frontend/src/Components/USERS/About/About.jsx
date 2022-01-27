import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import './About.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify'

function About() {
    const history = useHistory()
   const {State,AdminTrue,Users,IsLoaged}= useContext(DataContext)
   const LoginSuccess = () => toast("Login Success");
   const [adminTrue,setadminTrue]=AdminTrue
   const [isLoaged,setisLoaged]=IsLoaged
   const [state,setstate]=State
 
   const [user,setuser]=Users
   const [error, seterror] = useState()
   const [reload, setreload] = useState(false)
   const [input, setinput] = useState(
    {
      Email: '',
      Password: '',
    }
  )
  const formdata = new FormData()

   const handleChane =(e)=>{
    setinput({ ...input, [e.target.name]: e.target.value })
   }
   const handleClick =(e)=>{
     
    e.preventDefault()
    
  

axios.post('http://localhost:8008/signin',input).then((response)=>{
      console.log('resq',response.data.session.user.Name);

      setuser(response.data.session.user)
      localStorage.setItem('user', response.data.session.user.Name);
      setreload(true)
      setreload(false)
           
     if (response.data.session.signedIn) {
      LoginSuccess()
      setisLoaged(true)
        history.push('/') 
    }else alert('failed')
             
    })

   }
   useEffect(() => {
    setadminTrue(false)
    localStorage.getItem('user')
    
   }, [reload])
    return (
        <div className='Login' >
          <div className="Login-img">
            <img src="https://dashboard.researchandranking.com/user_assets/Login/img/Left-Login-banner-img.png" alt="" />
          </div>

          <div style={{width:'50%'}} className="container">
          
        
          <h1 className="h1">LOGIN</h1>
          {error ? <h2 style={{color:'red'}}>{error}</h2> : "" }
          <input onChange={handleChane}  name="Email" value={input.Email} placeholder="email" class="input" autoComplete='off' type="email " />
          <input onChange={handleChane}  name="Password" value={input.Password} placeholder="password" class="input" type="password" />
          <button onClick={handleClick}  type="submit" class="button">Login </button>
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
        
          <div className="already">
      <Link style={{textDecoration:'none'}} to='/signup'>  <Button  className='btn btn-primary text-dark' >Dont have an account ?</Button> </Link>
      </div>
        
      </div>
      
      
      
        </div>
    )
}

export default About
