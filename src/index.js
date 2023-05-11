import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthState from './helper/auth/AuthState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthState>
     <App />
  </AuthState>
   
  // </React.StrictMode>
);