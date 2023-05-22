-- Create a database and use it.
CREATE DATABASE moviedb;
USE moviedb;

-- Creating tables:
CREATE TABLE directors(
	user_name VARCHAR(100) NOT NULL,
    director_password VARCHAR(100),
	director_name VARCHAR(100),
    director_surname VARCHAR(100),
    nationality VARCHAR(100) NOT NULL,  -- Each director must have only one nation.
    platform_id VARCHAR(50),
    PRIMARY KEY (user_name)
);

CREATE TABLE audience(
	user_name VARCHAR(100) NOT NULL,
    audience_password VARCHAR(100),
	audience_name VARCHAR(100),
    audience_surname VARCHAR(100),
    PRIMARY KEY (user_name)
);

CREATE TABLE rating_platforms(
	platform_id VARCHAR(50) NOT NULL,
    platform_name VARCHAR(100),
    PRIMARY KEY (platform_id)
);

CREATE TABLE agreement(
	user_name VARCHAR(100) NOT NULL,
    platform_id VARCHAR(50),
    FOREIGN KEY (user_name) REFERENCES directors(user_name),
    FOREIGN KEY (platform_id) REFERENCES rating_platforms(platform_id),
    PRIMARY KEY (user_name) -- Each director can have at most one platform id.
);

CREATE TABLE subscribes(
	user_name VARCHAR(100) NOT NULL,
    platform_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES audience(user_name),
    FOREIGN KEY (platform_id) REFERENCES rating_platforms(platform_id),
    PRIMARY KEY (user_name, platform_id) 
);

CREATE TABLE movies(
	movie_id VARCHAR(50) NOT NULL, 
    movie_name VARCHAR(100), 
    duration INTEGER, 
    average_rating FLOAT,
    PRIMARY KEY (movie_id)
);

-- More requirements
CREATE TABLE ratings( 
	movie_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_name) REFERENCES audience(user_name),
    duration INTEGER, 
    rating FLOAT,
    PRIMARY KEY (movie_id, user_name)  -- A user can rate the same movie only once.
);

CREATE TABLE movie_predecessors(
	successor_id VARCHAR(50) NOT NULL,
    predecessor_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (successor_id) REFERENCES movies(movie_id),
    FOREIGN KEY (predecessor_id) REFERENCES movies(movie_id),
    PRIMARY KEY (successor_id, predecessor_id)
);

CREATE TABLE directed_by(
	movie_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_name) REFERENCES directors(user_name),
    PRIMARY KEY (movie_id) -- We assumed a movie can have at most one director.
);

CREATE TABLE genres(
	genre_id VARCHAR(50) NOT NULL,
    genre_name VARCHAR(100),
    PRIMARY KEY (genre_id)
);

CREATE TABLE movie_genres(
	movie_id VARCHAR(50) NOT NULL,
	genre_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
    PRIMARY KEY (genre_id, movie_id)
);

CREATE TABLE session(
	session_id VARCHAR(50) NOT NULL,
    session_date VARCHAR(50),
    time_slot INTEGER,
    PRIMARY KEY (session_id)
);

CREATE TABLE movie_session(
	movie_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (session_id) REFERENCES session(session_id),
    PRIMARY KEY (session_id) -- A session can have at most one movie
);

CREATE TABLE theatre(
	theatre_id VARCHAR(50) NOT NULL,
    theatre_name VARCHAR(100),
	capacity INTEGER,
    district VARCHAR(100),
    PRIMARY KEY (theatre_id)
);

CREATE TABLE session_locations(
	theatre_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (theatre_id) REFERENCES theatre(theatre_id),
    FOREIGN KEY (session_id) REFERENCES session(session_id),
    PRIMARY KEY (session_id) -- A session cannot have more than one locations
);

CREATE TABLE tickets(
	ticket_id VARCHAR(50) NOT NULL,
	user_name VARCHAR(100) NOT NULL,
    session_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (user_name) REFERENCES audience(user_name),
    FOREIGN KEY (session_id) REFERENCES session(session_id),
    PRIMARY KEY (ticket_id)
);

CREATE TABLE database_managers(
	user_name VARCHAR(100) NOT NULL,
	manager_password VARCHAR(100),
    -- One more requirement // Check and trigger to prevent more than one db managers.
    PRIMARY KEY (user_name)
)

