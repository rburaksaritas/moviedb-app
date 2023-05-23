import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

function Directordashboard() {

    // Handle logout
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    };

    // Handle tab navigation
    const [currentTab, setCurrentTab] = useState('');
    const handleTabClick = (tabName) => {
        setCurrentTab(tabName);
    };


    // Simple navigation bar.
    return (
        <div>
            <div className='button-container'>
                <button onClick={() => handleTabClick('theaters')} className='button'>Theaters</button>
                <button onClick={() => handleTabClick('movies')} className='button'>Movies</button>
                <button onClick={() => handleTabClick('audience')} className='button'>Audience</button>
                <button onClick={() => handleLogout()} className='button' id='logout-button'>Logout</button>
            </div>
            {renderContent()}
        </div>
    );
}

export default Directordashboard;