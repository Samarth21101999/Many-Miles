import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthPage from './components/auth';

const App = () => {
  return (
    <div>
        <AuthPage/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);