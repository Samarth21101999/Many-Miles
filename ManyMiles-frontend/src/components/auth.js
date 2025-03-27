import React, { useState } from 'react';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    contact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login' : 'Signup', formData);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl lg:max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Decorative Section (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              {isLogin ? 'Welcome Back!' : 'Hello, Friend!'}
            </h2>
            <p className="text-lg mb-8">
              {isLogin 
                ? 'Log in to access your personal account' 
                : 'Create your account and start your journey'}
            </p>
            <img 
              src="/api/placeholder/400/300" 
              alt="Authentication Illustration" 
              className="mx-auto max-w-full h-auto"
            />
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <h2 className="text-center text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
            {isLogin ? 'Login to Your Account' : 'Create an Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            
            {!isLogin && (
              <div className="relative">
                <label htmlFor="contact" className="sr-only">Contact No.</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  required={!isLogin}
                  placeholder="Contact No"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            {!isLogin && (
              <div className="text-sm text-gray-600">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    required
                  />
                  <span className="ml-2">
                    I agree to the Terms and Conditions
                  </span>
                </label>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="h-px bg-gray-300 w-full"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2">
              <i className="fab fa-google"></i>
              <span className="hidden sm:inline">Google</span>
            </button>
            <button className="bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition duration-300 flex items-center justify-center space-x-2">
              <i className="fab fa-facebook"></i>
              <span className="hidden sm:inline">Facebook</span>
            </button>
            <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 flex items-center justify-center space-x-2">
              <i className="fab fa-apple"></i>
              <span className="hidden sm:inline">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;