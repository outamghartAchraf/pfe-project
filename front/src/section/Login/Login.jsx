import './Login.css'
import axios from 'axios';
import {  useState } from 'react';
import Header from '../Header/Header'
import { FetContext } from '../../context/ContextD';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const Login = () => {
 
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
 
const [accept , setaccept] = useState(false);
const [emailErour , setemailErour] = useState("");

// cookie 
const cookie = new Cookies();

const isLogin = FetContext();
const nav = useNavigate();
 

const Submit =async (e) =>{
    let flag = true;
    e.preventDefault();
    setaccept(true)
    if(  password<8    ){
        flag = false
    }else{ flag = true}
    try{
        if(flag){
            let res = await axios.post('http://127.0.0.1:8000/api/login',{
                 
                 email:email,
                 password:password,
                
     
             })

             const token = res.data.data.token;
             cookie.set('Bearer',token);
             const userDetails = res.data.data.user;

               
           isLogin.setauth({token , userDetails})
           if(userDetails.email === 'admin@gmail.com'){
            nav('/dashboard')

           }else{
            nav('/')
           }
           

            //  if(res.status === 200){
            //     localStorage.setItem('email',email)
            //     window.location.pathname='/';
            
            //  }
     
         }
     

    }catch(erour){
        setemailErour(erour.response.status)

    }

// console.log(name,email,password,passwordR)

}
  return (
    <div className='G-container'>
          <Header/> 
      
    <form className='formregister' onSubmit={Submit}>
          
          <label htmlFor='email' >Email:</label>
          <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} id='email' placeholder='email'/> 
           {emailErour === 422 && accept && <p style={{color:'red', fontSize:'14px'}}>Email is all in database</p>}
          <label htmlFor='password' >password:</label>
          <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} id='password' placeholder='password'/> 
           {password.length < 8 && accept &&   <p style={{color:'red', fontSize:'14px'}}>password must be 8 caractere !</p>}
         
          <button className='btn' type='submit'>Login</button>
      </form>
   
  </div>
  )
}

export default Login