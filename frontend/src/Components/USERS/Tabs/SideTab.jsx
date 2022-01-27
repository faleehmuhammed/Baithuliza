import { useState } from 'react';
import {Tabs,Tab} from 'react-bootstrap'
import Modal from '../Addproduct/Addproduct';
import Myorders from '../Myorders/Myorders';
import WishList from '../Wishlist/WishList';
const Sidetab = ({nwUser}) => {
  const [key, setKey] = useState('home');
  return (
    <Tabs  defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 d-flex justify-content-center">
    <Tab style={{width:'100%'}} className='bg-light' eventKey="profile" title="Profile">
    <div style={{color:'#000'}} > 
       <h1>{nwUser&& nwUser.Email}</h1>
       <h1>{nwUser&& nwUser.Name}</h1>
        
      </div>
    </Tab>
    <Tab style={{width:'100%'}} className='bg-light' eventKey="wishlist" title="Wishlist">
    <div>
    <WishList/>
        
      </div>
    </Tab>
    <Tab style={{width:'100%'}} className='bg-light' eventKey="order" title="My Orders" >
      <div>
      <Myorders/>
      </div>
    </Tab>
  </Tabs>
  )
}

export default Sidetab;

