 
import './App.css';
import { PersistLogin, RequireAuth, UpdateUser, Users } from './component';
import { SignUp,Header,Login,Home,Dashboard,CreateUser, Products, CreateProduct, UpdateProduct } from './section';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
   
    <Routes>

       <Route path='/' element={<Home/>}/> 
      <Route path='/register' element={<SignUp/>}/> 
      <Route path='/login' element={<Login/>}/> 

      //protected Route
      <Route element={<PersistLogin/>}>
      <Route element={<RequireAuth/>}>
         <Route path='/dashboard' element={<Dashboard/>}>
           <Route path='users' element={<Users/>}/>
           <Route path='users/:id' element={<UpdateUser/>}/> 
           <Route path='user/create' element={<CreateUser/>}/> 
           <Route path='products' element={<Products/>}/> 
           <Route path='products/create' element={<CreateProduct/>}/> 
           <Route path='products/:id' element={<UpdateProduct/>}/> 
         </Route>
      </Route>
      </Route>
    </Routes>
    
    </BrowserRouter>
      
     
    </>
  );
}

export default App;
