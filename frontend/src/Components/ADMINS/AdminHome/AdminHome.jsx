import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import Admin from '../AdminLogin/Admin'
import Showallusers from '../ShowAllUsers/Showallusers'
import './AdminHome.css'
import Tabl from '../AdminTable/Table'
import Datatable from '../AdminTable/Datatables'

function AdminHome() {
  const [items, setitems] = useState([])
  const { Users, Cartcount, AdminTrue } = useContext(DataContext)
  const [adminTrue, setadminTrue] = AdminTrue
  const getAdmindetails = () => {
    axios.get('http://localhost:8008/admin/').then((response) => {
      console.log(response);
      setitems(response.data.products)
    })
  }
  useEffect(() => {
    setadminTrue(true)
    getAdmindetails()

  }, [])
  return (






    <div>
      <h1>Welcome to Admin Home page</h1>
      
      
        {/* <Table width='100%' striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Product name Name</th>
              <th>Price</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{i.Name}</td>
                <td>{i.Price}</td>
                <td>{i.CreatedBy}</td>
                 
              </tr>
            ))}



          </tbody>
        </Table> */}

      
      <Datatable items={items} />
    </div>
  )
}

export default AdminHome
