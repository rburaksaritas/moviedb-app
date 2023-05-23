import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login logic here
    console.log('user_name:', user_name);
    console.log('password:', password);
    console.log('Role:', role);

    // Send the login request to the backend server
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name, password, role }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the backend server
        if (data.status === 'success') {
          onLogin({ username: user_name, role: role });
          // Login successful, redirect to the appropriate dashboard based on the role
          if (role === 'manager') {
            navigate('/manager-dashboard');
          } else if (role === 'director') {
            navigate('/director-dashboard');
          } else if (role === 'audience') {
            navigate('/audience-dashboard');
          }
        } else {
          // Login failed, handle the error
          console.error('Login failed:', data.error);
          // You can display an error message or perform any other action here
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any error that occurred during the login request
      });
  };

  return (
    <div className='App-wrapper'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type='text'
            value={user_name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='manager'>Manager</option>
            <option value='director'>Director</option>
            <option value='audience'>Audience</option>
          </select>
        </div>
        <p></p>
        <button type='submit' className='button'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
