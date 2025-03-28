import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';

const App = () => {
  return (
    <div>
        {/* <Login/> */}
        <Signup/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);