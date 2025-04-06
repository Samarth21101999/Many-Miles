import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Dashboard from './components/Home/Dashboard';
import Profile from './components/Authentication/Profile'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { login, loginSuccess } from './store/authSlice';
import appStore from './store/appStore';
import {
  createBrowserRouter,
  BrowserRouter, 
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router";

import { CookiesProvider } from 'react-cookie';
import AddCar from './components/Car/AddCar';



// const PersistGate = ({ children }) => {
  
//   const dispatch = useDispatch();
//   const {isAuthenticated,user}=useSelector((state)=>state.auth);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
    
//     if (token && userData && !user) {
//       try {
//         const user = JSON.parse(userData);
//         dispatch(loginSuccess({ user, token }));
//         if(window.location.pathName==='/' || window.location.pathName==="/login"){
//          window.location.replace("/");
//         }

//       } catch (error) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//       }
//     }
//   }, [dispatch,user]);

//   return children;
// };

// const PrivateRoute=({children})=>{
  
//   const navigate=useNavigate();
//   const {isAuthenticated}=useSelector((state)=>state.auth);
//    useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);
//   return isAuthenticated ?children : navigate("/login");

// }  


const App=()=>{
  return(

    <Provider store={appStore}>
    {/* <PersistGate> */}
    
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/> */}
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              // <PrivateRoute>
                <Dashboard />
              // </PrivateRoute>
            }
          >
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/addCar" element={<AddCar/>}/>
           
          </Route>
         
        </Routes>
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
 
  )
}



export default App;