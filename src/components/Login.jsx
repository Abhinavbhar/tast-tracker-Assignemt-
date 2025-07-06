import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');

 
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
    }
          window.location.href = '/dashboard';
  };



  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
