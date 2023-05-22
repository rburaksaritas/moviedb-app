import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="App-wrapper">
      <h1>Welcome to our Project 3</h1>
      <p>Ramazan Burak Sarıtaş - 2020400321<br></br>Ali Alperen Sönmez - 2020400354</p>
      <Link to="/login"><button className="button">Login</button></Link>
    </div>
  );
}

export default Home;
