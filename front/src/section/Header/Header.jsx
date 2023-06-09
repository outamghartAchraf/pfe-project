import { FetContext } from '../../context/ContextD';
import './Headre.css'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

const Header = () => {
 
  const cookies = new Cookies()
  const token = cookies.get('Bearer');

  const HandleLogout = async () => {
    await axios.post(
      'http://127.0.0.1:8000/api/logout',
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    cookies.remove('Bearer');
    window.location.pathname = '/';
  };

  

 
  return (
    <div className='navbar'>
      
        <h1>ACHRAFSHOP</h1>
        <nav className='nav'>
            <Link to='/' href='' >Home</Link>
            <a href='/'>pages</a>
            <a href='/'>about</a>
        </nav>
        <div className='group-btn'>
        {!token ? (
         <>  
          <Link to='/register' className='btn'>
            Register</Link>
            
            <Link to='/login' className='btn'>Login</Link>
            </>
            ):(
              <div style={{display:'flex'}}>
       
         <Link to='/Dashboard' className='btn'>Dashboard</Link>
          <div  className='btn' onClick={HandleLogout} >log out</div>
          </div>
            )  
          
          }
        

            
            
        
        </div>
    </div>
  )
}

export default Header