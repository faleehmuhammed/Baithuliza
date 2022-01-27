import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Change.css'

function Change() {
    const [ref, setref] = useState(false)
    const [items, setitems] = useState([
        
    ])
    const getAdmindetails = () => {
        axios.get('http://localhost:8008/admin/').then((response) => {
          console.log(response);
          setitems(response.data.products)
        })
      }
      const deleteItem =(id)=>{
          alert
          (id)
          axios.post(`http://localhost:8008/admin/delete-product/${id}`).then((res)=>{
              console.log(res);
              setref(true)
              setref(false)
          })
      }
      const deleteAllItem =()=>{
          
          axios.get('http://localhost:8008/admin/delete-all-products').then((res)=>{
              console.log(res);
              setref(true)
              setref(false)
          })
      }
      useEffect(() => {
            getAdmindetails()
      }, [])
    return (
        <div className='main-i' >
            
 <>
 <table class="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Uploaded</th>
            <th>Delte</th>
        </tr>
    </thead>
    <tbody>
        {items.map((i)=>(
            <tr>
            <td>{i.Name}</td>
            <td>{i.Price}</td>
            <td>{i.CreatedBy}</td>
            <td><button onClick={()=>deleteItem(i._id)} className='btn btn-danger' >Delete</button></td>
        </tr>

        ))}
        
       
        
    </tbody>
</table>
<div className="dlt-btn">
<button className='btn btn-danger' onClick={deleteAllItem} >Delete All</button>
</div>
</>:
<div  className="no-item mt-4">
 
 </div>
 
 


            {/* <div class="container">
  
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">Job Id</div>
      <div class="col col-2">Customer Name</div>
      <div class="col col-3">Amount Due</div>
      <div class="col col-4">Payment Status</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42235</div>
      <div class="col col-2" data-label="Customer Name">John Doe</div>
      <div class="col col-3" data-label="Amount">$350</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42442</div>
      <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
      <div class="col col-3" data-label="Amount">$220</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42257</div>
      <div class="col col-2" data-label="Customer Name">John Smith</div>
      <div class="col col-3" data-label="Amount">$341</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42311</div>
      <div class="col col-2" data-label="Customer Name">John Carpenter</div>
      <div class="col col-3" data-label="Amount">$115</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
  </ul>
</div> */}
        </div>
    )
}

export default Change
