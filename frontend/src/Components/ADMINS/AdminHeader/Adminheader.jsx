import React from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import './Adminheader.css'
import {Link} from 'react-router-dom'

function Adminheader() {
    return (
        
            <div className="mainhead">
                <div className='left'>
                  <h1>Admin Page</h1>  
                </div>
                <div className='right' >
                  <Link to='/adminhome' > <button  >Products</button> </Link>  
                   <Link to='/getallusers' > <button>User</button></Link> 
                   <Link to='/allorders' > <button>Orders</button></Link> 
                    
                    
                    
                </div>
            </div>
        
    )
}

export default Adminheader
