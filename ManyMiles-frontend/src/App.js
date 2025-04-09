import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Dashboard from './components/Home/Dashboard';
import Profile from './components/Authentication/Profile'
import { Provider, useDispatch, useSelector } from 'react-redux';
import appStore from './store/appStore';
import {
  createBrowserRouter,
  BrowserRouter, 
  Route,
  Routes,
  useNavigate,
  useLocation,
  Outlet,
  RouterProvider
} from "react-router";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import AddCar from './components/Car/AddCar';
import Navbar from './components/Navbar/Navbar';

import CarDetails from './components/Car/CarDetails';

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


const AppLayout=()=>{
  // const location = useLocation();
   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [cookies,setCookie , removeCookie] = useCookies(['accessToken']);
  // const [name, setName] = useState("");
  // const [loading, setLoading] = useState(true); // <- add loading state

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.accessToken) {
  //       navigate("/login");
  //       return;
  //     }
      
  //     try {
  //       const response = await axios.post('http://localhost:5000/user/verify',{}, {
  //         headers: {
  //           'Authorization': `Bearer ${cookies.accessToken}`
  //         },
  //         withCredentials: true
  //       });

  //       const { user } = response.data;

  //       if (!user) {
  //         removeCookie("accessToken");
  //         navigate("/login");
  //       } else {
  //         console.log(user.name)
  //         dispatch(setUser({ name: user.name, email: user.email }));
        
  //         localStorage.setItem('user',JSON.stringify(user));
  //       }
  //     } catch (err) {
  //       console.error("Cookie verification failed:", err);
  //       removeCookie("accessToken");
  //       navigate("/login");
  //     } finally {
  //       setLoading(false); // <- allow render after verification
  //     }
  //   };

  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);

  // if (loading) {
  //   return <div>Loading...</div>; // Loading state while waiting for cookie verification
  // }
  return(
    
   
    <div className='app'>
      {!isAuthPage && <Navbar/>}
      <Outlet/>
    </div>
   
      
 
  )
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    
    children: [
      {
        path: "/",
        element: <Dashboard />,
        // children: [
        //   { path: "profile", element: <Profile /> },
        //   { path: "addCar", element: <AddCar /> },
        // ],
      },
      {
        path:"/profile",
        element: <Profile />,
      },
      {
        path: "/addCar",
        element: <AddCar />,
      },
      {
        path: "/car/:id",
        element: <CarDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      // You can uncomment and add About, Contact later
      // {
      //   path: "/about",
      //   element: <About />,
      // },
      // {
      //   path: "/contact",
      //   element: <Contact />,
      // },
    ],
  },
]);

const App=()=>{
  return (
    <Provider store={appStore}>
    <RouterProvider router={appRouter} />
    </Provider>
  )
}
export default App;