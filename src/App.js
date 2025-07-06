import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <Routes>
        <Route
          path="/"element={username?(<div>Hello, {username}!</div>):(<Navigate to="/login" replace />)}/>
        <Route path="/login"element={username ? (<Navigate to="/" replace />) : (<Login />)}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
