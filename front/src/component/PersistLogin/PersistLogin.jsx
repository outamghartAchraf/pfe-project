import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { FetContext } from '../../context/ContextD';
import Loading from '../Loading/Loading';
import Cookies from 'universal-cookie';
 




const PersistLogin = () => {

    const [loading,setloading] = useState(true)
    const authcont = FetContext();
    const token = authcont.auth.token;

    // cookie
    const cookie = new Cookies();
     
    const getToken = cookie.get('Bearer')
   
    useEffect(()=>{

        const RefreshToken = async () => {
            try {
              const token = getToken;  
              const response = await axios.post(
                'http://127.0.0.1:8000/api/refresh',
                null,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,  
                  },
                }
              );
          
              cookie.set('Bearer', response.data.token); 
               
               authcont.setauth((prev) => {
                 return {
                  userDetails: response.data.user,
                  token: response.data.token,
                };
              });
            } catch (error) {
              console.error(error);  
             } finally {
              setloading(false);  
            }
          };
          
       !token ? RefreshToken() : setloading(false);
    },[])  
  
    
       return loading ? <Loading/>  : <Outlet/>
     
   
}

export default PersistLogin