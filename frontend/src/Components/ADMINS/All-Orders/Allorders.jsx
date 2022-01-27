import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Allorders() {
    const [data, setdata] = useState([])
    const getAllorders =()=>{
        axios.get('http://localhost:8008/admin/all-orders').then((response)=>{
            console.log(response);
            setdata(response.data.orders)
        })
        
    }
    useEffect(() => {
        getAllorders()
    }, [])
    return (
        <div>
            <div className='main-i' >
            
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
                    {data.map((i,index) => (
                        <tr>
                            <td>{i.orderObject.date}</td>
                            <td>{i.orderObject.paymentMethod}</td>
                            <td>{i.orderObject.totalAmount}</td>
                            <td></td>

                            {/* <td><button onClick={()=>deleteUser(i._id)}  className='btn btn-danger' >Delete</button></td> */}
                        </tr>

                    ))}



                </tbody>
            </table>
            


            {/* <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>User Name</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            allusers.map((i,index) => (
                                <tr>
                                <td>{index+1}</td>
                                <td>{i.Name}</td>
                                <td>{i.Email}</td>
                                </tr>
                            ))
                        }



                    


                </tbody>
            </Table> */}
        </div>
        </div>
    )
}

export default Allorders
