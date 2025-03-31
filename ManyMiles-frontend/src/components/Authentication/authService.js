import { useState, useCOn } from "react";
import { useDispatch } from 'react-redux';
import { login, loginFailure, loginStart, loginSuccess } from "../../store/authSlice";
import {useNavigate } from 'react-router'


export const useauthService=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const login=async(email,password)=>{
        dispatch(loginStart());
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({email, password}),
          });
      
          if(!response.ok){
              const errorData = await response.json();  
              setError(errorData.message || 'Login Failed');
              dispatch(loginFailure(errorData.message || 'Login Failed'))
              return;
          }
    
          const data = await response.json();

          localStorage.setItem('user',JSON.stringify(data.user || data));
          localStorage.setItem('token',data.accessToken);
          dispatch(loginSuccess({user:data.user || data}))
          navigate('/dashboard')
          //   dispatch(login({data}));
        //   // <Navigate replace to="/dashboard"/>
        //   navigate("/dashboard")
         return data;
    };
    // Logout and clear storage
  const logout= () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  // Get current user from localStorage
  const getCurrentUser= () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };
  
  // Get auth token
  const getToken= () => {
    return localStorage.getItem('token');
  };
  
  // Check if user is authenticated
  const isAuthenticated= () => {
    return !!localStorage.getItem('token');
  };

  return{
    login,
    logout,
    getCurrentUser,
    getToken,
    isAuthenticated,
  };
  
};