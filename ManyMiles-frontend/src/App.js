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
import {setUser} from './store/authSlice';
import CarDetails from './components/Car/CarDetails';



const AppLayout=()=>{
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser);
    if (storedUser) {
      dispatch(setUser({ name: storedUser.name, email: storedUser.email }));
    }
  }, []);



  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';



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