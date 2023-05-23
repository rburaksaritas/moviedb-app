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
    const [newMovie, setNewMovie] = useState({
        movie_id: '',
        movie_name: '',
        theater_id: '',
        time_slot: ''
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
    const fetchMoviesList = () => { }
    const handleAddMovie = (e) => { }
    const handleAddPredecessor = (e) => { }
    const handleRenameMovie = (e) => { }
    const renderMoviesTable = () => { }
    // ...

    // Variables related to Audience tab.
    const [audienceSearch, setAudienceSearch] = useState('');
    const [audienceList, setAudienceList] = useState([]);

    // Handle Audience tab actions.
    const fetchAudienceList = () => { }
    const handleAudienceSearch = (e) => { }
    const renderAudienceTable = () => { }
    //...

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
                            value={newMovie.theater_id}
                            onChange={(e) => setNewMovie({ ...newMovie, theater_id: e.target.value })}
                        />
                        <label>Time Slot:</label>
                        <input
                            type="text"
                            value={newMovie.time_slot}
                            onChange={(e) => setNewMovie({ ...newMovie, time_slot: e.target.value })}
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

                    <h2>Movies List</h2>
                    {renderMoviesTable()}
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