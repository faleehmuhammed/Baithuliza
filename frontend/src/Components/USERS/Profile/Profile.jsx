import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { DataContext } from '../../../Context/Context'
import ProfilePic from '../../../profile.png'
import Sidetab from "../Tabs/SideTab"

function Profile() {


    const { State, AdminTrue, Users, Cartcount } = useContext(DataContext)
    const [adminTrue, setadminTrue] = AdminTrue
    const [OpenModal, setOpenModal] = useState(false)
    const [nwUser, setnwUser] = useState()
    const [openWish, setopenwish] = useState()
    
    const  getUserDetails =()=>{
        axios.get('http://localhost:8008/userDetails').then((res)=>{
            console.log(res);
            setnwUser(res.data.message)
        })
    }
    const getMyorders =(txt)=>{
        setopenwish(txt)
        axios.get('http://localhost:8008/orders').then((response)=>{
            console.log(response);
        })
    }
    const modalFunction =()=>{
        setopenwish('modal')
        
    }
    useEffect(() => {
        getUserDetails()
        setadminTrue(false)
    }, [])
  return(
   
   <div>
       <div className="profile-img">
           <img src={ProfilePic} alt="" />
       </div>
       <Sidetab nwUser={nwUser} />
       

     
  </div>)
}

export default Profile;
