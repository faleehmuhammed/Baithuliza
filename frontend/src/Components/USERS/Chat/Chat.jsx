// import React, { useState } from 'react'
// import './Chat.css'
// import {useParams} from 'react-router-dom'
// import axios from 'axios';
// function Chat() {
//   const [message, setmessage] = useState([])
//  const {id} = useParams()

//  const getAllChats =()=>{
//    console.log(id);
//    axios.get(`http://localhost:8008/chat/${id}`).then((response)=>{
//      console.log('response',response);
     


//    })
//  }

//  console.log('id',id);
//  getAllChats()
//  const sendChat=()=>{
//    axios.post('http://localhost:8008/chat',{reciver:id,message:message}).then((response)=>{

//    })
//  }
//     return (
//         <div>
//             ;<div id="container">
//   <aside>
//     <header>
//       <input type="text" placeholder="search" />
//     </header>
//     <ul>
//       <li>
//         <img
//           src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
//           alt
//         />
//         <div>
//           <h2>Prénom Nom</h2>
//           <h3>
//             <span className="status orange" />
//             offline
//           </h3>
//         </div>
//       </li>
      
      
      
        
     
     
//       <li>
//         <img
//           src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_08.jpg"
//           alt
//         />
//         <div>
//           <h2>Prénom Nom</h2>
//           <h3>
//             <span className="status green" />
//             online
//           </h3>
//         </div>
//       </li>
//       <li>
//         <img
//           src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_09.jpg"
//           alt
//         />
//         <div>
//           <h2>Prénom Nom</h2>
//           <h3>
//             <span className="status green" />
//             online
//           </h3>
//         </div>
//       </li>
//       <li>
//         <img
//           src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_10.jpg"
//           alt
//         />
//         <div>
//           <h2>Prénom Nom</h2>
//           <h3>
//             <span className="status orange" />
//             offline
//           </h3>
//         </div>
//       </li>
//     </ul>
//   </aside>
//   <main>
//     <header>
//       <img
//         src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
//         alt
//       />
//       <div>
//         <h2>Chat with Vincent Porter</h2>
//         <h3>already 1902 messages</h3>
//       </div>
//       <img
//         src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
//         alt
//       />
//     </header>
//     <ul id="chat">
//       <li className="you">
//         <div className="entete">
//           <span className="status green" />
//           <h2>Vincent</h2>
//           <h3>10:12AM, Today</h3>
//         </div>
//         <div className="triangle" />
//         <div className="message">
//           Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
//           commodo ligula eget dolor.
//         </div>
//       </li>
//       <li className="me">
//         <div className="entete">
//           <h3>10:12AM, Today</h3>
//           <h2>Vincent</h2>
//           <span className="status blue" />
//         </div>
//         <div className="triangle" />
//         <div className="message">
//           Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
//           commodo ligula eget dolor.
//         </div>
//       </li>
      
      
      
     
//     </ul>
//     <footer>
      
//       <textarea onChange={(e)=>setmessage(e.target.value)} placeholder="Type your message" defaultValue={""} />
//       <img
//         src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png"
//         alt
//       />
//       <img
//         src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png"
//         alt
//       />
//       <button onClick={sendChat}>Send</button>
//     </footer>
//   </main>
// </div>

//         </div>
//     )
// }

// export default Chat
