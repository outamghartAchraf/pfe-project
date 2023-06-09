import { Link } from 'react-router-dom'
import './Topbar.css'

const Topbar = () => {
  return (
    <div className='topbar container top-bar'>
      <div>
      <h1>Achraf SHop</h1>
      </div>
      <div>
      <Link to='/' className='btn' >Go To Website</Link>
      </div>
    </div>
  )
}

export default Topbar