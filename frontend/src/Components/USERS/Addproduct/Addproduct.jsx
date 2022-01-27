// import axios from 'axios'
// import React, { useState } from 'react'
// import { Modal, Button } from 'react-bootstrap'


// function Modals({ isTrue }) {
//   const [images, setimages] = useState('')
//   const [allImages, ] = useState([])

//   const handleChange = (file) => {

//     setimages(file)
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     console.log('reader', reader);
//   }
//   const handleImage = () => {

//     const formdata = new FormData()

//     formdata.append('file', images)
//     formdata.append('upload_preset', 'llcm6mzz')
//     axios.post('https://api.cloudinary.com/v1_1/di0bgblj1/image/upload ', formdata).then((response) => {
//       console.log(response);
//     })
//     setimages('')
//   }

//   return (
//     <div>
//       <Modal.Dialog>
//         <Modal.Header closeButton onClick={()=>isTrue(false)}>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <input type="text" />
//           <br />
//           <br />
//           <input onChange={(e) => handleChange(e.target.files[0])} type="file" />
//           <br />
//           <br />
//           <button onClick={handleImage} >submit</button>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button onClick={() => isTrue(false)} variant="secondary">Close</Button>
//           <Button variant="primary">Save changes</Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//       {
//         allImages.map((i) => {
//           return <h2>{i}</h2>
//         })
//       }
//     </div>
//   )
// }

// export default Modals



import axios from "axios";
import React, { useState } from "react";
import './Addproduct.css'

function Modal({ setOpenModal }) {
    const [image, setimage] = useState()
    const [isloading, setisloading] = useState(false)
    const [url, seturl] = useState()
    const [input, setinput] = useState({
        name: '',
        category: '',
        price: null,
        description: ''
    })
    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const handleAdd = async () => {
         setisloading(true)
        console.log('handleAdd Working');
        const formdata = new FormData()

        formdata.append('file', image)
        formdata.append('upload_preset', 'llcm6mzz')
       await axios.post('https://api.cloudinary.com/v1_1/di0bgblj1/image/upload ', formdata).then((response) => {
            console.log(response);
            seturl(response.data.url)
        })
        url && await axios.post('http://localhost:8008/addproduct', { input: input,url:url }).then((res) => {
            console.log(res);
            res.data.vibe && alert('successfuly added')
            setimage()
            setisloading(false)
        })

        
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>ADD PRODUCTS</h1>
                </div>
                <div className="body">
                    <input type="text" onChange={handleChange} name='name' placeholder='Product name' />
                    <input type="text" onChange={handleChange} name='category' placeholder='Product Category' />
                    <input type="text" onChange={handleChange} name='price' placeholder='Product Price' />

                    <input type="text"  onChange={handleChange} name='description' placeholder='Product Description' />
                    <input accept="image/png" onChange={(e) => setimage(e.target.files[0])} type="file" />


                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={handleAdd}>{isloading ? 'Wait....':'Add'} </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;

