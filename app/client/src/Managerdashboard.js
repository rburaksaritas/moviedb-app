import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

function Managerdashboard() {

    const navigate = useNavigate();
    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    // Variable to keep track of the current tab.
    const [currentTab, setCurrentTab] = useState('');

    // Handle tab navigation.
    const handleTabClick = (tabName) => {
        setCurrentTab(tabName);
    };

    // Variables related to Audience tab.
    const [newAudience, setNewAudience] = useState({
        user_name: '',
        audience_password: '',
        audience_name: '',
        audience_surname: ''
    });
    const [deleteAudience, setDeleteAudience] = useState('');
    const [audienceList, setAudienceList] = useState([]);

    // Handle audience tab actions.
    const fetchAudienceList = () => {
        fetch('/manager-dashboard/audience', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch audience list');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Audience List:', data);
                // Update the audienceList state with the fetched data
                setAudienceList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleAddAudience = (e) => {
        e.preventDefault();

        fetch('/manager-dashboard/audience', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAudience),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Add Audience Response:', data);
                // Refresh the audience list after adding a new audience
                fetchAudienceList();
                // Reset the form fields
                setNewAudience({
                    user_name: '',
                    audience_password: '',
                    audience_name: '',
                    audience_surname: ''
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDeleteAudience = (e) => {
        e.preventDefault();

        fetch('/manager-dashboard/audience', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name: deleteAudience }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Delete Audience Response:', data);
                // Refresh the audience list after deleting an audience
                fetchAudienceList();
                // Reset the form field
                setDeleteAudience('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const renderAudienceTable = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Surname</th>
                    </tr>
                </thead>
                <tbody>
                    {audienceList.map((audience) => (
                        <tr key={audience.user_name}>
                            <td>{audience.user_name}</td>
                            <td>{audience.audience_password}</td>
                            <td>{audience.audience_name}</td>
                            <td>{audience.audience_surname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Variables related to Director tab.
    const [newDirector, setNewDirector] = useState({
        user_name: '',
        director_password: '',
        director_name: '',
        director_surname: '',
        nationality: '',
        platform_id: ''
    });
    const [changeDirectorPlatform, setChangeDirectorPlatform] = useState({
        user_name: '',
        platform_id: ''
    });
    const [directorList, setDirectorList] = useState([]);

    // Handle director tab actions.
    const fetchDirectorList = () => {
        fetch('/manager-dashboard/director', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch director list');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Director List:', data);
                // Update the directorList state with the fetched data
                setDirectorList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleAddDirector = (e) => {
        e.preventDefault();

        fetch('/manager-dashboard/director', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDirector),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Add Director Response:', data);
                // Refresh the director list after adding a new director
                fetchDirectorList();
                // Reset the form fields
                setNewDirector({
                    user_name: '',
                    director_password: '',
                    director_name: '',
                    director_surname: '',
                    nationality: '',
                    platform_id: '',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleChangeDirectorPlatform = (e) => {
        e.preventDefault();

        fetch('/manager-dashboard/director', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changeDirectorPlatform),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Change Director Platform Response:', data);
                // Refresh the director list after changing the platform ID
                fetchDirectorList();
                // Reset the form fields
                setChangeDirectorPlatform({
                    user_name: '',
                    platform_id: '',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const renderDirectorTable = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Nationality</th>
                        <th>Platform ID</th>
                    </tr>
                </thead>
                <tbody>
                    {directorList.map((director) => (
                        <tr key={director.user_name}>
                            <td>{director.user_name}</td>
                            <td>{director.director_password}</td>
                            <td>{director.director_name}</td>
                            <td>{director.director_surname}</td>
                            <td>{director.nationality}</td>
                            <td>{director.platform_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Variables related to ratings tab.
    const [ratingSearch, setRatingSearch] = useState('');
    const [ratingResults, setRatingResults] = useState([]);

    // Handle rating tab actions.
    const fetchRatings = () => {

        fetch('/manager-dashboard/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name: ratingSearch }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ratings');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Rating Results:', data);
                // Update the ratingResults state with the fetched data
                setRatingResults(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleRatingSearch = (e) => {
        e.preventDefault();
        fetchRatings();
        console.log('Rating Search:', ratingSearch);
        // Reset the form field
        setRatingSearch('');
    };

    const renderRatingResults = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Movie ID</th>
                        <th>Movie Name</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {ratingResults.map((rating) => (
                        <tr key={rating.movie_id}>
                            <td>{rating.movie_id}</td>
                            <td>{rating.movie_name}</td>
                            <td>{rating.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Variables related to movies tab.
    const [movieSearch, setMovieSearch] = useState('');
    const [movieResults, setMovieList] = useState([]);

    // Handle movies tab actions.
    const handleMovieSearch = (e) => {
        e.preventDefault();

        fetch('/manager-dashboard/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name: movieSearch }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Movie Search Results:', data);
                setMovieList(data);
                setMovieSearch('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const renderMovieResults = () => {
        if (movieResults.length === 0) {
            return <p>No movies found.</p>;
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Movie ID</th>
                        <th>Movie Name</th>
                        <th>Theatre ID</th>
                        <th>District</th>
                        <th>Time Slot</th>
                    </tr>
                </thead>
                <tbody>
                    {movieResults.map((movie) => (
                        <tr key={movie.movie_id}>
                            <td>{movie.movie_id}</td>
                            <td>{movie.movie_name}</td>
                            <td>{movie.theatre_id}</td>
                            <td>{movie.district}</td>
                            <td>{movie.time_slot}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };


    // Fetch current lists to render once initially without additional actions required.
    useEffect(() => {
        fetchAudienceList();
        fetchDirectorList();
    }, []);

    // Render content of selected tab.
    const renderContent = () => {
        if (currentTab === 'audience') {
            return (
                <div>
                    <h2>Add Audience</h2>
                    <form onSubmit={handleAddAudience}>
                        <label>User Name:</label>
                        <input
                            type='text'
                            value={newAudience.user_name}
                            onChange={(e) =>
                                setNewAudience({ ...newAudience, user_name: e.target.value })
                            }
                        />
                        <label>Audience Password:</label>
                        <input
                            type='password'
                            value={newAudience.audience_password}
                            onChange={(e) =>
                                setNewAudience({ ...newAudience, audience_password: e.target.value })
                            }
                        />
                        <label>Audience Name:</label>
                        <input
                            type='text'
                            value={newAudience.audience_name}
                            onChange={(e) =>
                                setNewAudience({ ...newAudience, audience_name: e.target.value })
                            }
                        />
                        <label>Audience Surname:</label>
                        <input
                            type='text'
                            value={newAudience.audience_surname}
                            onChange={(e) =>
                                setNewAudience({ ...newAudience, audience_surname: e.target.value })
                            }
                        />
                        <button type='submit' className='button'>Add Audience</button>
                    </form>

                    <h2>Delete Audience</h2>
                    <form onSubmit={handleDeleteAudience}>
                        <label>User Name:</label>
                        <input
                            type='text'
                            value={deleteAudience}
                            onChange={(e) => setDeleteAudience(e.target.value)}
                        />
                        <button type='submit' className='button'>Delete Audience</button>
                    </form>

                    <h2>Current Audiences</h2>
                    {renderAudienceTable()}
                </div>
            );
        } else if (currentTab === 'directors') {
            return (
                <div>
                    <h2>Add Director</h2>
                    <form onSubmit={handleAddDirector}>
                        <label>User Name:</label>
                        <input
                            type='text'
                            value={newDirector.user_name}
                            onChange={(e) =>
                                setNewDirector({ ...newDirector, user_name: e.target.value })
                            }
                        />
                        <label>Director Password:</label>
                        <input
                            type='password'
                            value={newDirector.director_password}
                            onChange={(e) =>
                                setNewDirector({ ...newDirector, director_password: e.target.value })
                            }
                        />
                        <label>Director Name:</label>
                        <input
                            type='text'
                            value={newDirector.director_name}
                            onChange={(e) =>
                                setNewDirector({ ...newDirector, director_name: e.target.value })
                            }
                        />
                        <label>Director Surname:</label>
                        <input
                            type='text'
                            value={newDirector.director_surname}
                            onChange={(e) =>
                                setNewDirector({ ...newDirector, director_surname: e.target.value })
                            }
                        />
                        <label>Nationality:</label>
                        <input
                            type='text'
                            value={newDirector.nationality}
                            onChange={(e) =>
                                setNewDirector({ ...newDirector, nationality: e.target.value })
                            }
                        />
                        <label>Platform ID:</label>
                        <input
                            type='text'
                            value={newDirector.platform_id}
                            onChange={(e) =>
                                setNewDirector({ ...newDirector, platform_id: e.target.value })
                            }
                        />
                        <button type='submit' className='button'>Add Director</button>
                    </form>

                    <h2>Change Platform ID</h2>
                    <form onSubmit={handleChangeDirectorPlatform}>
                        <label>User Name:</label>
                        <input
                            type='text'
                            value={changeDirectorPlatform.user_name}
                            onChange={(e) =>
                                setChangeDirectorPlatform({ ...changeDirectorPlatform, user_name: e.target.value })
                            }
                        />
                        <label>Platform ID:</label>
                        <input
                            type='text'
                            value={changeDirectorPlatform.platform_id}
                            onChange={(e) =>
                                setChangeDirectorPlatform({ ...changeDirectorPlatform, platform_id: e.target.value })
                            }
                        />
                        <button type='submit' className='button'>Change Platform ID</button>
                    </form>

                    <h2>Current Directors</h2>
                    {renderDirectorTable()}
                </div>
            );
        } else if (currentTab === 'ratings') {
            return (
                <div>
                    <h2>Search Ratings</h2>
                    <form onSubmit={handleRatingSearch}>
                        <label>Audience User Name:</label>
                        <input
                            type='text'
                            value={ratingSearch}
                            onChange={(e) => setRatingSearch(e.target.value)}
                        />
                        <button type='submit' className='button'>Search Ratings</button>
                    </form>
                    {renderRatingResults()}
                </div>
            );
        } else if (currentTab === 'movies') {
            return (
                <div>
                    <h2>Search Movies</h2>
                    <form onSubmit={handleMovieSearch}>
                        <label>Director User Name:</label>
                        <input
                            type='text'
                            value={movieSearch}
                            onChange={(e) => setMovieSearch(e.target.value)}
                        />
                        <button type='submit' className='button'>Search Movies</button>
                    </form>
                    {renderMovieResults()}
                </div>
            );
        } else if (currentTab === 'average-rating') {
            return (
                <div>
                    <h2>Search Average Rating</h2>
                    {/* Search form for average rating */}
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
                <button onClick={() => handleTabClick('audience')} className='button'>Audience</button>
                <button onClick={() => handleTabClick('directors')} className='button'>Directors</button>
                <button onClick={() => handleTabClick('ratings')} className='button'>Ratings</button>
                <button onClick={() => handleTabClick('movies')} className='button'>Movies</button>
                <button onClick={() => handleTabClick('average-rating')} className='button'>Average Rating</button>
                <button onClick={() => handleRedirectToLogin()} className='button' id='logout-button'>Logout</button>
            </div>
            <div className='content-container'>{renderContent()}</div>
        </div>
    );
}

export default Managerdashboard;
