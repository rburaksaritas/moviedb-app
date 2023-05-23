import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

function Directordashboard({ currentUser }) {

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

    // Variables related to Theaters tab
    const [theatersList, setTheatersList] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');

    // Fetch theaters list for a given slot
    const fetchTheatersList = () => {
        if (selectedSlot) {
            fetch(`/director-dashboard/theatres?time_slot=${selectedSlot}`)
                .then((response) => response.json())
                .then((data) => setTheatersList(data))
                .catch((error) => console.error(error));
        }
    };

    // Handle theaters search
    const handleTheatersSearch = (e) => {
        e.preventDefault();
        fetchTheatersList();
    };

    // Render results to theaters table 
    const renderTheatersTable = () => {
        if (theatersList.length === 0) {
            return <p>No theaters found.</p>;
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Theater ID</th>
                            <th>District</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theatersList.map((theater) => (
                            <tr key={theater.theatre_id}>
                                <td>{theater.theatre_id}</td>
                                <td>{theater.district}</td>
                                <td>{theater.capacity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    // Variables related to Movies tab.
    const [moviesList, setMoviesList] = useState([]);
    const [newMovie, setNewMovie] = useState({
        movie_id: '',
        movie_name: '',
        theatre_id: '',
        time_slot: '',
        session_id: '',
        session_date: '',
    });

    const [predecessorData, setPredecessorData] = useState({
        successor_id: '',
        predecessor_id: ''
    });

    const [renameMovieData, setRenameMovieData] = useState({
        movie_id: '',
        new_name: ''
    });

    // Handle Movies tab actions.
    const fetchMoviesList = () => {
        if (currentUser) {
            fetch(`/director-dashboard/my-movies?user_name=${currentUser.username}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch movies list');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Movies List:', data);
                    setMoviesList(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setMoviesList([]); // Set an empty array to avoid mapping issues
                });
        } else console.log("no user?")
    };

    const handleAddMovie = (e) => {
        e.preventDefault();
        fetch('/director-dashboard/add-movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...newMovie,
                user_name: currentUser.username
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add movie');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Add Movie Response:', data);
                // Refresh the movies list
                fetchMoviesList();
                setNewMovie({
                    movie_id: '',
                    movie_name: '',
                    theatre_id: '',
                    time_slot: '',
                    session_id: '',
                    session_date: ''
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const handleAddPredecessor = (e) => {
        e.preventDefault();
        fetch('/director-dashboard/add-predecessor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(predecessorData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add predecessor');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Add Predecessor Response:', data);
                setPredecessorData({
                    successor_id: '',
                    predecessor_id: ''
                });
                // Refresh the movies list
                fetchMoviesList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleRenameMovie = (e) => {
        e.preventDefault();
        fetch('/director-dashboard/update-movie-name', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(renameMovieData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to rename movie');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Rename Movie Response:', data);
                setRenameMovieData({
                    movie_id: '',
                    new_name: ''
                })
                // Refresh the movies list
                fetchMoviesList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const renderMoviesTable = () => {
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
                            <th>Theater ID</th>
                            <th>Time Slot</th>
                            <th>Predecessors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesList.map((movie) => (
                            <tr key={movie.movie_id}>
                                <td>{movie.movie_id}</td>
                                <td>{movie.movie_name}</td>
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

    // Variables related to Audience tab.
    const [audienceSearch, setAudienceSearch] = useState('');
    const [audienceList, setAudienceList] = useState([]);

    // Handle Audience tab actions.
    const fetchAudienceList = () => {
        fetch(`/director-dashboard/audience-list?movie_id=${audienceSearch}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Audience List:', data);
                setAudienceList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setAudienceList([]); // Set an empty array to avoid mapping issues
            });
    };

    const handleAudienceSearch = (e) => {
        e.preventDefault();
        fetchAudienceList();
    };

    const renderAudienceTable = () => {
        if (audienceList.length === 0) {
            return <p>No audience found.</p>;
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Surname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audienceList.map((audience) => (
                            <tr key={audience.user_name}>
                                <td>{audience.user_name}</td>
                                <td>{audience.name}</td>
                                <td>{audience.surname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    useEffect(() => {
        fetchTheatersList();
        fetchMoviesList();
        fetchAudienceList();
    }, []);

    const renderContent = () => {
        if (currentTab === 'theaters') {
            return (
                <div className='content-container'>
                    <h2>Theaters</h2>
                    <form onSubmit={handleTheatersSearch}>
                        <label>Select Slot:</label>
                        <input
                            type="text"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                        />
                        <button type="submit" className="button">
                            List Theaters
                        </button>
                    </form>
                    <div className='results-container'>
                        {renderTheatersTable()}
                    </div>
                </div>
            );
        } else if (currentTab === 'movies') {
            return (
                <div className='large-container'>
                    <div className='content-container'>
                        <h2>Add Movie</h2>
                        <form onSubmit={handleAddMovie}>
                            <label>Movie ID:</label>
                            <input
                                type="text"
                                value={newMovie.movie_id}
                                onChange={(e) => setNewMovie({ ...newMovie, movie_id: e.target.value })}
                            />
                            <label>Movie Name:</label>
                            <input
                                type="text"
                                value={newMovie.movie_name}
                                onChange={(e) => setNewMovie({ ...newMovie, movie_name: e.target.value })}
                            />
                            <label>Theater ID:</label>
                            <input
                                type="text"
                                value={newMovie.theatre_id}
                                onChange={(e) => setNewMovie({ ...newMovie, theatre_id: e.target.value })}
                            />
                            <label>Time Slot:</label>
                            <input
                                type="text"
                                value={newMovie.time_slot}
                                onChange={(e) => setNewMovie({ ...newMovie, time_slot: e.target.value })}
                            />
                            <label>New Session ID:</label>
                            <input
                                type="text"
                                value={newMovie.session_id}
                                onChange={(e) => setNewMovie({ ...newMovie, session_id: e.target.value })}
                            />
                            <label>New Session Date:</label>
                            <input
                                type="text"
                                placeholder='2023-05-22'
                                value={newMovie.session_date}
                                onChange={(e) => setNewMovie({ ...newMovie, session_date: e.target.value })}
                            />
                            <button type="submit" className="button">
                                Add Movie
                            </button>
                        </form>

                        <h2>Add Predecessor</h2>
                        <form onSubmit={handleAddPredecessor}>
                            <label>Successor ID:</label>
                            <input
                                type="text"
                                value={predecessorData.successor_id}
                                onChange={(e) =>
                                    setPredecessorData({ ...predecessorData, successor_id: e.target.value })
                                }
                            />
                            <label>Predecessor ID:</label>
                            <input
                                type="text"
                                value={predecessorData.predecessor_id}
                                onChange={(e) =>
                                    setPredecessorData({ ...predecessorData, predecessor_id: e.target.value })
                                }
                            />
                            <button type="submit" className="button">
                                Add Predecessor
                            </button>
                        </form>

                        <h2>Rename Movie</h2>
                        <form onSubmit={handleRenameMovie}>
                            <label>Movie ID:</label>
                            <input
                                type="text"
                                value={renameMovieData.movie_id}
                                onChange={(e) =>
                                    setRenameMovieData({ ...renameMovieData, movie_id: e.target.value })
                                }
                            />
                            <label>New Name:</label>
                            <input
                                type="text"
                                value={renameMovieData.new_name}
                                onChange={(e) =>
                                    setRenameMovieData({ ...renameMovieData, new_name: e.target.value })
                                }
                            />
                            <button type="submit" className="button">
                                Rename Movie
                            </button>
                        </form>
                    </div>
                    <div className='results-container'>
                        <h2>Movies List</h2>
                        {renderMoviesTable()}
                    </div>
                </div>
            );
        } else if (currentTab === 'audience') {
            return (
                <div className='content-container'>
                    <h2>View Audience</h2>
                    <form onSubmit={handleAudienceSearch}>
                        <label>Movie ID:</label>
                        <input
                            type="text"
                            value={audienceSearch}
                            onChange={(e) => setAudienceSearch(e.target.value)}
                        />
                        <button type="submit" className="button">
                            View Audience
                        </button>
                    </form>
                    <div className='results-container'>
                        {renderAudienceTable()}
                    </div>
                </div>
            );
        } else {
            return <div>Please select a tab</div>;
        }
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