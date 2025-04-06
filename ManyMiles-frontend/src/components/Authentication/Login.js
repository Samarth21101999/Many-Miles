import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from "../../store/authSlice";
import {useNavigate } from 'react-router'
import axios from 'axios';
import {Link} from 'react-router'
import { useCookies } from 'react-cookie';
// import { useauthService } from "./authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");   
  const[cookie,setCookie]=useCookies(['accessToken']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
// const {login}=useauthService();
  const handleLogin = async(e) => {
    // dispatch(loginStart());
    e.preventDefault();
    setError('');
try{
 
    // dispatch(loginStart());
    const response = await axios.post('http://localhost:5000/user/login', {
       
        email,
        password
       ,
      },
      {withCredentials:true},
      {headers: {
        'Content-Type': 'application/json',
      }}  
    );
  
      if(response.status!=200){
          const errorData = await response.json();  
          setError(errorData.message || 'Login Failed');
          // dispatch(loginFailure(errorData.message || 'Login Failed'))
          return;
      }

      const data = await response.data;
      console.log(data.user.name)
      setCookie('accessToken', data.accessToken, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 3*24*60*60 // expires in 1 hour
      });
      localStorage.setItem('user',data.user.name);
      localStorage.setItem('token',data.accessToken);
      dispatch(loginSuccess({user:data}))
      navigate('/')
      //   dispatch(login({data}));
    //   // <Navigate replace to="/dashboard"/>
    //   navigate("/dashboard")
    //  return data;
    // dispatch(login({email,password}));
  //  navigate("/dashboard");
      
}catch(error){

    console.log(error);
    setError(error.message || 'An Error Occurred');
    // dispatch(loginFailure(error.message));
}
    // dispatch(login({ email }));
    // navigate("/dashboard");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6"  onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div className="mt-2">
            <input 
            type="email" 
            name="email" 
            id="email" 
            autoComplete="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input 
            type="password" 
            name="Password" 
            id="password" 
            placeholder="Password"  
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          </div>
        </div>
  
        <div>
          <button 
          type="submit" 
         
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account?
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Signup</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;