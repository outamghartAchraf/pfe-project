import { Link, NavLink } from 'react-router-dom'
import  './Sidebar.css'
import { FaUser,FaProductHunt } from 'react-icons/fa'
import { MdAssignmentAdd  } from 'react-icons/md'
 
import { ImUserPlus} from "react-icons/im";
const Sidebar = () => {
  return (
    <div className='side-bar'>
      <h1>Dashboard</h1>
        <NavLink   className='item-link' to='/dashboard/users'><FaUser/> Users</NavLink>
        
        <NavLink className='item-link'   to='/dashboard/user/create'> 
             <ImUserPlus   size='25px' style={{marginRight:"3px"}}/>
            New User</NavLink>

            <NavLink className='item-link'   to='/dashboard/products/'> 
             <FaProductHunt  size='26px' style={{marginRight:"3px"}}/>
             Products</NavLink>

            <NavLink className='item-link'   to='/dashboard/products/create'> 
             <MdAssignmentAdd   size='25px' style={{marginRight:"3px"}}/>
           New Product</NavLink>

              
      
 
 
    </div>
  )
}
// code html css dashbord website ?
export default Sidebar