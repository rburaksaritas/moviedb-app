import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Managerdashboard from './Managerdashboard';
import Directordashboard from './Directordashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/manager-dashboard" 
            element={currentUser && currentUser.role === 'manager' 
              ? <Managerdashboard currentUser={currentUser} onLogout={handleLogout} /> 
              : <Login onLogin={handleLogin}/>
            } 
          />
          <Route 
            path="/director-dashboard" 
            element={currentUser && currentUser.role === 'director' 
              ? <Directordashboard currentUser={currentUser} onLogout={handleLogout} /> 
              : <Login onLogin={handleLogin}/>
            } 
          />
          {/* Add other routes for different pages */}
        </Routes>
    </Router>
  );
}
export default App;
