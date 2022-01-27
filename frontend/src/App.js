
import './App.css';
import Main from './Components/USERS/Main/Main';
import Header from './Components/USERS/Header/Header';
import {BrowserRouter,Route} from 'react-router-dom'
import About from './Components/USERS/About/About';
// import Contact from './Components/USERS/Contact/Contact';
import Signup from './Components/USERS/Signup/Signup';
import Cart from './Components/USERS/Cart/Cart';
import Placeorder from './Components/USERS/Place-order/Placeorder';
import Modal from './Components/USERS/Addproduct/Addproduct';
import Contact from './Components/USERS/Contact/Contact'
import Admin from './Components/ADMINS/AdminLogin/Admin';
import AdminHome from './Components/ADMINS/AdminHome/AdminHome';
import Showallusers from './Components/ADMINS/ShowAllUsers/Showallusers';
import { DataContext } from './Context/Context';
import { useContext, useEffect, useState } from 'react';
import Adminheader from './Components/ADMINS/AdminHeader/Adminheader';
import axios from 'axios';
import Ordersuccess from './Components/USERS/Order-Scucess/Ordersuccess';
import Change from './Components/Change/Change';
import Allorders from './Components/ADMINS/All-Orders/Allorders';
import Profile from './Components/USERS/Profile/Profile';
import Chat from './Components/USERS/Chat/Chat';


function App() {
  const { Users,Cartcount,AdminTrue,IsLoaged } = useContext(DataContext)
  const [adminTrue, setadminTrue] = AdminTrue
  const [isLoaged,setisLoaged] =IsLoaged
  const [thing, setthing] = useState(false)

  useEffect(() => {
   let it= localStorage.getItem('user')
   it && setisLoaged(true)
   setthing(it)
    
    axios.get('http://localhost:8008/signin').then((res)=>{
      console.log(res);
      res.user && setisLoaged(true)
    })
    
  }, [])
   return (
    <div className="App">
      <BrowserRouter>
      {!adminTrue ? <Header/> : <Adminheader/> }
      
      
      
      <Route path ='/admin' component={Admin} />
      <Route path ='/adminhome' component={Change} />
      <Route path ='/getallusers' component={Showallusers} />
      <Route path ='/allorders' component={Allorders} />




      {/* Users Section */}
      <Route exact path='/'> <Main/> </Route>
      <Route path ='/About' component={About} />
      <Route path='/Contact' component={Contact} />
      <Route path='/Signup' component={Signup} />
      <Route path='/Cart' component={Cart} />
      <Route path='/place-order' component={Placeorder} />
      <Route path='/add-product' component={Modal} />
      <Route path='/order-success' component={Ordersuccess} />
      <Route path='/profile' component={Profile} />
      <Route path='/Chat/:id' component={Chat} />

      {/* <Route path='/*' component={Cart} /> */}

      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
