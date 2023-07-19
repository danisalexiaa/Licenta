import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
   const userSignIn = useSelector((state) => state.userSignIn);
   const {userInfo} = userSignIn;
   return userInfo ? children : <Navigate to="/signin"/>;
};

export default PrivateRoute;
