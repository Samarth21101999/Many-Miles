// import React from 'react'
// import { Outlet, useNavigate } from 'react-router'
// import Navbar from '../Navbar/Navbar'
// import { useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie';
// import axios from 'axios';
// const Dashboard = () => {

//   const navigate=useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
//   const [isLoading, setLoading]=useState(true);
//   const [name,setName]=useState("");
//   useEffect(()=>{
//     const verifyCookie=async()=>{


//       console.log(cookies.accessToken)
//       if(!cookies || !cookies.accessToken){
//         return navigate("/login")
//       }
//       try {
//         // Use the verification endpoint
//         const response = await axios.post('http://localhost:5000/user/verify', {}, {
//           headers: {
//             'Authorization': `Bearer ${cookies.accessToken}`
//           },
//           // Also send cookies with the request
//           withCredentials: true
//         });
//         console.log(response.data)
//         const { status, user } = response.data;
        
//         if (user && user.name) {
//           setName(user.name);
//         }
  
//         if (status !== 200) {
//           removeCookie("accessToken");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Cookie verification error:", error);
//         removeCookie("accessToken");
//         navigate("/login");
//       }
//     }
//     verifyCookie();
//   },[cookies.accessToken,navigate,removeCookie]);


//   if(isLoading){
//     return <div className="flex justify-center items-center h-screen"><h1 className="text-2xl font-bold">Loading...</h1></div>
//   }

//   return (
//     <div>
//     <Navbar/>
//     <Outlet  name={name}/>
//     </div>
//   )
// }

// export default Dashboard
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Car from '../Car/Car';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['accessToken']);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // <- add loading state

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.accessToken) {
        navigate("/login");
        return;
      }
      
      try {
        const response = await axios.post('http://localhost:5000/user/verify',{}, {
          headers: {
            'Authorization': `Bearer ${cookies.accessToken}`
          },
          withCredentials: true
        });

        const { user } = response.data;

        if (!user) {
          removeCookie("accessToken");
          navigate("/login");
        } else {
          setName(user.name);
          localStorage.setItem('user',JSON.stringify(user));
          dispatch(setUser({ name: user.name, email: user.email }));
          
        }
      } catch (err) {
        console.error("Cookie verification failed:", err);
        removeCookie("accessToken");
        navigate("/login");
      } finally {
        setLoading(false); // <- allow render after verification
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <div>
      <Car/>
    </div>
  );
};

export default Dashboard;
