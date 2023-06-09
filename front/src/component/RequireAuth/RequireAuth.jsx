import React from 'react'
import { FetContext } from '../../context/ContextD'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Login } from '../../section';

const RequireAuth = () => {

    const user = FetContext();
    const location = useLocation();

 
  return user.auth.userDetails  ? <Outlet/> : <Navigate state={{from : location}} replace to='/login' />
    
  
     
}

export default RequireAuth