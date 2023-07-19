import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { listFilmGenres } from './actions/filmActions';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import CartScreen from './screens/CartScreen';
import FilmEditScreen from './screens/FilmEditScreen';
import FilmListScreen from './screens/FilmListScreen';
import FilmScreen from './screens/FilmScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderList from './screens/OrderList';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignInScreen from './screens/SignInScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';



function App() {
  const cart = useSelector(state=>state.cart);
  const {cartItems} = cart;
  const userSignIn = useSelector((state)=> state.userSignIn);
  const {userInfo} = userSignIn;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(()=>{
    dispatch(listFilmGenres());
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className = "grid-container">
        <header className="row">
          <div>
            <Link className="brand" to = '/'>Filmgoria</Link>
           </div>
           <div>
             {/* <Routes>
             <Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route>
             </Routes> */}
             <SearchBox/>
          </div>  
          <div>
            <Link to = '/cart'>Cart
            {cartItems.length>0 &&(
              <span className='badge'>{cartItems.length}</span>
            )}
            </Link>
            {
              userInfo ? (
                <div className='dropdown'>
                <Link to="#">{userInfo.name}<i className='fa fa-caret-down'></i></Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to="/profile">Profil</Link>
                  </li>
                  <li>
                    <Link to="orderhistory">Comenzi</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>Delogare</Link>
                  </li>
                </ul>
                </div>
              ) : (
                <Link to  = '/signin'>Autentificare</Link>
              ) }
              { userInfo && userInfo.isAdmin && (
                <div className='dropdown'>
                  <Link to="#admin">Admin<i className='fa fa-caret-down'></i></Link>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to="/dashboard" >Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/filmlist" >Filme</Link>
                    </li>
                    <li>
                      <Link to="/orderlist" >Comenzi</Link>
                    </li>
                    <li>
                      <Link to="/userlist" >Users</Link>
                    </li>
                  </ul>
                </div>

              )}
            
          </div>
       </header>
       <main>
         
         <Routes>
           
        <Route path="/cart/:id" element={<CartScreen/>}></Route>
        <Route path="/cart" element={<CartScreen/>}></Route>
        <Route path="/film/:id" element={<FilmScreen/>} exact></Route>
        <Route path="/film/:id/edit" element={<FilmEditScreen/>} exact></Route>
        <Route path="/signin" element={<SignInScreen/>}></Route>
        <Route path="/register" element={<RegisterScreen/>}></Route>
        <Route path="/shipping" element={<ShippingScreen/>}></Route>
        <Route path="/payment" element={<PaymentMethodScreen/>}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
        <Route path="/order/:id" element={<OrderScreen/>}></Route>
        <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
        <Route path="/profile" element={<ProfileScreen/>}></Route>
        <Route path="/search/name" element={<SearchScreen/>} exact></Route>
        <Route path="/search/name/:name" element={<SearchScreen/>} exact></Route>
        <Route path="/search/genre" element={<SearchScreen/>} exact></Route>
        <Route path="/search/genre/:genre" element={<SearchScreen/>} exact></Route>
        <Route path="/search/genre/:genre/name/:name/min/:min/max/:max/rating/:rating/order/:order" element={<SearchScreen/>} exact></Route>
        
        <Route path="/" element={<HomeScreen/>} exact></Route>
          
        <Route
         path="/profile" 
         element={
         <PrivateRoute>
           <ProfileScreen/>
         </PrivateRoute>}/>

        <Route path="/filmlist" element={<AdminRoute><FilmListScreen/></AdminRoute>}/>
        <Route path="/orderlist" element={<AdminRoute><OrderList/></AdminRoute>}/>
        <Route path="/userlist" element={<AdminRoute><UserListScreen/></AdminRoute>}/>
        <Route path="/user/:id/edit" element={<AdminRoute><UserEditScreen/></AdminRoute>}/>
        </Routes>
       
       </main>
       <footer className="row center">
         All rights reserved.
       </footer>
     </div>
   </BrowserRouter>
  );
}

export default App;
