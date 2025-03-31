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



// const PersistGate=({children})=>{
//   const dispatch=useDispatch();
//   const navigate=useNavigate();
//   const location=useLocation();
//   const {isAuthenticated, user}=useSelector(state=>state.auth);


//   useEffect(()=>{
//     const userData=localStorage.getItem('user');
//     const token=localStorage.getItem('token');

//     if(token && userData && !user){
      
//       try{
//         const user=JSON.parse(userData);
//         dispatch(loginSuccess({user}));

//         if(location.pathname==='/' || location.pathname==="/login"){
//           navigate('/dashboard');
//         }
//       }catch(error){
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }

//   },[dispatch,navigate, location.pathname, user]);
//   return children;
// }

// const AppLayout=()=>{
//   return <Outlet/>
// }



const PersistGate = ({ children }) => {
  
  const dispatch = useDispatch();
  // const navigate=useNavigate();
  // const location=useLocation();
  const {isAuthenticated,user}=useSelector((state)=>state.auth);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && userData && !user) {
      try {
        const user = JSON.parse(userData);
        dispatch(loginSuccess({ user, token }));
        if(window.location.pathName==='/' || window.location.pathName==="/login"){
         window.location.replace("/");
        }

      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [dispatch,user]);

  return children;
};

const PrivateRoute=({children})=>{
  
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector((state)=>state.auth);
   useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ?children : navigate("/login");

}  
//   return isAuthenticated ? children : null;
// //  const navigate=useNavigate();
// //   const user=useSelector((state)=>state.auth.user);
// //   console.log(user);
// //   return user ? children : navigate("/login");
// };


// const Root = () => {
//   return (
    
//   )
// }

const App=()=>{
  return(
    // <Provider store={appStore}>  
    
    //     {/* <Login/> */}
        
    //   <BrowserRouter basename='/'>
    //     <Routes>
    //       <Route path='/' element={<Dashboard/>}>
    //         <Route path='/login' element={<Login/>}/>
    //         <Route path='/register' element={<Signup/>}/>
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </Provider>
    <Provider store={appStore}>
    <PersistGate>
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
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
           <Route path="/profile" element={<Profile/>}/>
           
          </Route>
         
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
    // <PersistGate >
      
    // </PersistGate>
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>)

// root.render(<App />);const appRouter=createBrowserRouter([
  // let router=createBrowserRouter([
  //   {
  //   path:"/",
  //   element:<AppLayout/>,
  //   children:[
  //       {
  //           index:true,
  //           element:<Login/>
  //       },
  //       {
  //         path:"/register",
  //         element:<Signup/>
  //       },
  //       {
  //         path:"/dashboard",
  //         element:<Dashboard/>
  //       }
  //     ]
  //     },
  // ])
// router.routes[0].element=<App/>
// const root=ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Root/>)

export default App;