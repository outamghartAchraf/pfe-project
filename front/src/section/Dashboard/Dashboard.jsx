import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Topbar,Sidebar, Users } from "../../component"
 import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="">
       
        <div>
        <Topbar/>
           
        </div>

         <div className="content-flex ">
         <Sidebar/>
         <div className="us">
         
          
           <Outlet/>
          
          
         
         </div>
         </div>

          
            
     
        
       
    </div>
  )
}

export default Dashboard