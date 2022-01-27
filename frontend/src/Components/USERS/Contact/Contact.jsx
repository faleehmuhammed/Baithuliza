import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios'
import { DataContext } from '../../../Context/Context'


function Contact() {
    const {Users} = useContext(DataContext)
    const [contact,setcontact]=Users
    const getRandomUsers =()=>{
        axios.get('https://randomuser.me/api/?results=60').then((response)=>{
            console.log(response.data.results[0]);
           setcontact(response.data.results);
        })
    }
    useEffect(() => {
      getRandomUsers()
    }, [])
    return (
        <div>
             <h1>Contact</h1>
             {contact.map((i,key)=>(
                 <div key={key}>
                 <h1>{i.name.first}</h1>
                 <img src={i.picture.large} alt="image"  />
                 </div>
             ))}
        </div>
    )
}

export default Contact
