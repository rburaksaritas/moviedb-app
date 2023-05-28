import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AudienceDashboard({ currentUser }) {

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

    const [moviesList, setMoviesList] = useState([]);
    const [sessionList, setSessionList] = useState([]);
    const [ticketsList, setTicketsList] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');

    const fetchMoviesList = () => {
        fetch('/audience-dashboard/movies-list')
            .then((response) => response.json())
            .then((data) => {
                console.log('Movies List:', data);
                setMoviesList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMoviesList([]);
            });
    };

    const fetchSessionList = () => {
        fetch('/audience-dashboard/session-list')
            .then((response) => response.json())
            .then((data) => {
                console.log('Session List:', data);
                setSessionList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setSessionList([]);
            });
    };

    const fetchTicketsList = () => {
        fetch(`/audience-dashboard/tickets-list?user_name=${currentUser.username}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Tickets List:', data);
                setTicketsList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setTicketsList([]);
            });
    };

    const buyTicket = () => {
        fetch('/audience-dashboard/buy-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: currentUser.username,
                session_id: selectedSession,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to buy ticket');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Buy Ticket Response:', data);
                // Refresh the tickets list
                fetchTicketsList();
                setSelectedSession('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const renderMoviesList = () => {
        if (moviesList.length === 0) {
            return <p>No movies found.</p>;
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Movie ID</th>
                            <th>Movie Name</th>
                            <th>Director's Surname</th>
                            <th>Platform</th>
                            <th>Theatre ID</th>
                            <th>Time Slot</th>
                            <th>Predecessors List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesList.map((movie) => (
                            <tr key={movie.movie_id}>
                                <td>{movie.movie_id}</td>
                                <td>{movie.movie_name}</td>
                                <td>{movie.director_surname}</td>
                                <td>{movie.platform}</td>
                                <td>{movie.theatre_id}</td>
                                <td>{movie.time_slot}</td>
                                <td>{movie.predecessors}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderTicketsList = () => {
        if (ticketsList.length === 0) {
            return <p>No tickets found.</p>;
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Movie ID</th>
                            <th>Movie Name</th>
                            <th>Session ID</th>
                            <th>Rating</th>
                            <th>Overall Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketsList.map((ticket) => (
                            <tr key={ticket.session_id}>
                                <td>{ticket.movie_id}</td>
                                <td>{ticket.movie_name}</td>
                                <td>{ticket.session_id}</td>
                                <td>{ticket.rating}</td>
                                <td>{ticket.overall_rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    useEffect(() => {
        fetchMoviesList();
        fetchSessionList();
        fetchTicketsList();
    }, []);

    const renderContent = () => {
        if (currentTab === 'movies') {
            return (
                <div className='results-container'>
                    <h2>Movies List</h2>
                    {renderMoviesList()}
                </div>
            );
        } else if (currentTab === 'tickets') {
            return (
                <div>
                    <div className='results-container'>
                        <h2>Tickets List</h2>
                        {renderTicketsList()}
                    </div>
                    <h2>Buy Ticket</h2>
                    <form onSubmit={buyTicket}>
                        <label>Select Session:</label>
                        <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
                            <option value="">Select Session</option>
                            {sessionList.map((session) => (
                                <option key={session} value={session}>
                                    {session}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Buy Ticket</button>
                    </form>
                </div>
            );
        } else {
            return <div>Please select a tab</div>;
        }
    };

    return (
        <div className='content-container'>
            <div className='button-container'>
                <button onClick={() => handleTabClick('movies')} className='button'>Movies</button>
                <button onClick={() => handleTabClick('tickets')} className='button'>Tickets</button>
                <button onClick={handleLogout} className='button' id='logout-button'>Logout</button>
            </div>
            {renderContent()}
        </div>
    );
}

export default AudienceDashboard;