import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Managerdashboard from './Managerdashboard';
import Directordashboard from './Directordashboard';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager-dashboard" element={<Managerdashboard />} />
          <Route path="/director-dashboard" element={<Directordashboard />} />
          {/* Add other routes for different pages */}
        </Routes>
    </Router>
  );
}
export default App;
