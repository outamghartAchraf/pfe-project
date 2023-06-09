import axios from 'axios';
import {useState } from 'react';
import './SignUp.css'
 
 
 
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import { FetContext } from '../../context/ContextD';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

 
const SignUp = () => {
const [name , setname] = useState('');
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [passwordR, setpasswordR] = useState('');
const [accept , setaccept] = useState(false);
const [emailErour , setemailErour] = useState("");

const isLogin = FetContext();
const nav = useNavigate();
 
// cookie 

const cookie = new Cookies();


 

const Submit =async (e) =>{
    let flag = true;
    e.preventDefault();
    setaccept(true)
    if(name === "" || password<8 || passwordR !== password ){
        flag = false
    }else{ flag = true}
    try{
        if(flag){
            let res = await axios.post('http://127.0.0.1:8000/api/register',{
                 name:name,
                 email:email,
                 password:password,
                 password_confirmation:passwordR
     
             });

             const token = res.data.data.token;
             cookie.set('Bearer',token);
             const userDetails = res.data.data.user;


           isLogin.setauth({token , userDetails})
           nav('/')

            //  if(res.status === 200){
            //     localStorage.setItem('email',email)
            //     window.location.pathname='/';

            
            //  }

             
     
         }

        
     
 
    }catch(erour){
        setemailErour(erour.response.status)

    }
 


}

 

  return (
    <div className='G-container'>
        <Header/>
      
      <form className='formregister' onSubmit={Submit}>
            <label htmlFor='name' >Name:</label>
            <input type='text' value={name} onChange={(e)=>setname(e.target.value)} id='name' placeholder='name'/> 
            {name === "" && accept && <p style={{color:'red', fontSize:'14px'}}>user name is requere</p>}
            <label htmlFor='email' >Email:</label>
            <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} id='email' placeholder='email'/> 
             {emailErour === 422 && accept && <p style={{color:'red', fontSize:'14px'}}>Email is all in database</p>}
            <label htmlFor='password' >password:</label>
            <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} id='password' placeholder='password'/> 
             {password.length < 8 && accept &&   <p style={{color:'red', fontSize:'14px'}}>password must be 8 caractere !</p>}
            <label htmlFor='repeat' >Repeat password:</label>
            <input type='password' value={passwordR} onChange={(e)=>setpasswordR(e.target.value)} id='repeat' placeholder='forget password'/> 
            {passwordR !== password && accept && <p style={{color:'red', fontSize:'14px'}}>password dost not match !</p>}
            <button   className='btn' type='submit'>Register</button>
            
        </form>
     
    </div>
  )
}

export default SignUp