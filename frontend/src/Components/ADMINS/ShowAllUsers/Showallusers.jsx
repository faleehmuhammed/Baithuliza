import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function Showallusers() {
    const [ref, setref] = useState(false)
    const [allusers, setallusers] = useState([])
    const getAllUsers = () => {
        axios.get('http://localhost:8008/admin/all-users').then((result) => {
            console.log(result);
            setallusers(result.data.users)
        })
    }
    const deleteUser =(id)=>{
        let it= window.confirm('Are You Sure Delete ?')
        it && axios.get(`http://localhost:8008/admin/remove-user/${id}`).then((res)=>{
            console.log(res);
            setref(true)
            setref(false)
        }) 
        
        
    }
    
    useEffect(() => {
        getAllUsers()
    }, [ref])
    return (
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
                    {allusers.map((i,index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{i.Name}</td>
                            <td>{i.Email}</td>

                            <td><button onClick={()=>deleteUser(i._id)}  className='btn btn-danger' >Delete</button></td>
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
    )
}

export default Showallusers
