import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

function Managerdashboard() {

    const navigate = useNavigate();
    const handleRedirectToLogin = () => {
        navigate('/login');
      };

    const [currentTab, setCurrentTab] = useState('');

    const [newAudience, setNewAudience] = useState({
        user_name: '',
        audience_password: '',
        audience_name: '',
        audience_surname: ''
    });
    const [deleteAudience, setDeleteAudience] = useState('');
    const [audienceList, setAudienceList] = useState([]);

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
    const [ratingSearch, setRatingSearch] = useState('');
    const [movieSearch, setMovieSearch] = useState('');

    const handleTabClick = (tabName) => {
        setCurrentTab(tabName);
    };

    useEffect(() => {
        fetchAudienceList();
    }, []);

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

    const handleAddDirector = (e) => {
        e.preventDefault();
        // Logic to handle adding a new director
        console.log('New Director:', newDirector);
        // Reset the form fields
        setNewDirector({
            user_name: '',
            director_password: '',
            director_name: '',
            director_surname: '',
            nationality: '',
            platform_id: ''
        });
    };

    const handleChangeDirectorPlatform = (e) => {
        e.preventDefault();
        // Logic to handle changing the platform ID of a director
        console.log('Change Director Platform:', changeDirectorPlatform);
        // Reset the form fields
        setChangeDirectorPlatform({
            user_name: '',
            platform_id: ''
        });
    };

    const handleRatingSearch = (e) => {
        e.preventDefault();
        // Logic to handle rating search
        console.log('Rating Search:', ratingSearch);
        // Reset the form field
        setRatingSearch('');
    };

    const handleMovieSearch = (e) => {
        e.preventDefault();
        // Logic to handle movie search
        console.log('Movie Search:', movieSearch);
        // Reset the form field
        setMovieSearch('');
    };

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
                        <button type='submit'>Add Audience</button>
                    </form>

                    <h2>Delete Audience</h2>
                    <form onSubmit={handleDeleteAudience}>
                        <label>User Name:</label>
                        <input
                            type='text'
                            value={deleteAudience}
                            onChange={(e) => setDeleteAudience(e.target.value)}
                        />
                        <button type='submit'>Delete Audience</button>
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
                        <button type='submit'>Add Director</button>
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
                        <button type='submit'>Change Platform ID</button>
                    </form>

                    <h2>Current Directors</h2>
                    {/* Table of Current Directors */}
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
                        <button type='submit'>Search Ratings</button>
                    </form>
                    {/* Display ratings based on search */}
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
                        <button type='submit'>Search Movies</button>
                    </form>
                    {/* Display movies based on search */}
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

    return (
        <div>
            <div className='button-container'>
                <button onClick={() => handleTabClick('audience')}>Audience</button>
                <button onClick={() => handleTabClick('directors')}>Directors</button>
                <button onClick={() => handleTabClick('ratings')}>Ratings</button>
                <button onClick={() => handleTabClick('movies')}>Movies</button>
                <button onClick={() => handleTabClick('average-rating')}>Average Rating</button>
                <button onClick={() => handleRedirectToLogin()} className='logout-button'>Logout</button>
            </div>
            <div className='content-container'>{renderContent()}</div>
        </div>
    );
}

export default Managerdashboard;
