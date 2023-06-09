import { useEffect, useState } from 'react'
import './Users.css'
import { FaRegTrashAlt,FaRegEdit } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FetContext } from '../../context/ContextD';

const Users = () => {
 const [User , setUser] = useState([]);
const [runUseEffect , setRub] = useState(0);

const authcont = FetContext();
const token = authcont.auth.token;

 

useEffect(()=>{

    axios.get('http://127.0.0.1:8000/api/user/show',{
        headers:{
            Accept: 'application/json' ,
            Authorization:  `Bearer ${token}`

        }
    }).then((data)=>setUser(data.data))
    
},[runUseEffect])
   





const deleteUser = async (id) =>{

   try{

  const res =   await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,{
    headers:{
        Accept: 'application/json' ,
        Authorization:  `Bearer ${token}`

    }
  })
   if(res.status === 200){
    setRub((prev)=>prev + 1 )
   }

   }catch(error){
    console.log(error)
   }
}
   

  return (
    <div className='table-user'>
        <table>
            <thead>
             <tr>
                <th>Id</th>
                <th>User</th>
                <th>Email</th>
                <th>Method</th>
             </tr>
            </thead>
            <tbody>

                {
                    User?.map((item)=>{
                        return <tr key={item.id}>
                        <td>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.email}</td>
                         <td style={{textAlign:'center'}} >
                         <FaRegTrashAlt onClick={()=>deleteUser(item.id)}  size={20}  style={{padding:"10px", cursor:'pointer'}}/>
                        <Link to={`${item.id}`}>
                         <FaRegEdit size={20} style={{padding:"10px", cursor:'pointer'}}/>
                         </Link>
                         </td>
                        </tr>
                    })
                }
             

            

               
                 
            </tbody>
        </table>
   
    </div>
  )
}

export default Users