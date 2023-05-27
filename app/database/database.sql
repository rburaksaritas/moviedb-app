-- Creating tables:
-- User entity is not created since directors and audience cover users.
SET SQL_SAFE_UPDATES = 1;

CREATE TABLE rating_platforms(
	platform_id VARCHAR(50) NOT NULL,
    platform_name VARCHAR(100),
    PRIMARY KEY (platform_id)
);

CREATE TABLE directors_agreements(
	user_name VARCHAR(100) NOT NULL,
    director_password VARCHAR(100) NOT NULL,
	director_name VARCHAR(100) NOT NULL,
    director_surname VARCHAR(100) NOT NULL,
    nationality VARCHAR(100) NOT NULL,  -- Each director must have only one nation.
    platform_id VARCHAR(50),
    FOREIGN KEY (platform_id) REFERENCES rating_platforms(platform_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (user_name)
);

CREATE TABLE audience(
	user_name VARCHAR(100) NOT NULL,
    audience_password VARCHAR(100) NOT NULL,
	audience_name VARCHAR(100) NOT NULL,
    audience_surname VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_name)
);


CREATE TABLE subscribes(
	user_name VARCHAR(100) NOT NULL,
    platform_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES audience(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES rating_platforms(platform_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (user_name, platform_id) 
);

CREATE TABLE movies(
	movie_id VARCHAR(50) NOT NULL,
    movie_name VARCHAR(100), 
   	director_name VARCHAR(100) NOT NULL,
    duration INTEGER, 
    average_rating FLOAT,
	FOREIGN KEY (director_name) REFERENCES directors_agreements(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (movie_id)
);

CREATE TABLE ratings( 
	movie_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_name) REFERENCES audience(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
    rating FLOAT NOT NULL;
    CHECK (rating >= 0 AND rating <= 5),
    PRIMARY KEY (movie_id, user_name)  -- A user can rate the same movie only once.
);

CREATE TABLE movie_predecessors(
	successor_id VARCHAR(50) NOT NULL,
    predecessor_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (successor_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (predecessor_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (successor_id, predecessor_id)
);

/*
CREATE TABLE directed_by(
	movie_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_name) REFERENCES directors(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (movie_id) -- We assumed a movie can have at most one director.
);
*/

CREATE TABLE genres(
	genre_id INT UNSIGNED AUTO_INCREMENT,
    genre_name VARCHAR(100) UNIQUE,
    PRIMARY KEY (genre_id)
);

CREATE TABLE movie_genres(
	movie_id VARCHAR(50) NOT NULL,
	genre_id INT UNSIGNED,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (genre_id, movie_id)
);

/*
CREATE TABLE session(
	session_id VARCHAR(50) NOT NULL,
    session_date VARCHAR(50),
    time_slot INTEGER,
    PRIMARY KEY (session_id)
);
*/

CREATE TABLE theatre(
	theatre_id VARCHAR(50) NOT NULL,
    theatre_name VARCHAR(100),
	capacity INTEGER,
    district VARCHAR(100),
    PRIMARY KEY (theatre_id)
);

CREATE TABLE movie_session(
    session_id VARCHAR(50) NOT NULL,
	movie_id VARCHAR(50) NOT NULL,
	--theatre_id VARCHAR(50) NOT NULL,
    --session_date VARCHAR(50) NOT NULL,
	--time_slot INTEGER NOT NULL,
    
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (theatre_id) REFERENCES theatre(theatre_id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    PRIMARY KEY (session_id) -- A session can have at most one movie
);

CREATE TABLE occupied_slots(
    session_id VARCHAR(50) NOT NULL,
    theatre_id VARCHAR(50) NOT NULL,
    session_date VARCHAR(50) NOT NULL,
	time_slot INTEGER NOT NULL,
    CHECK (time_slot >= 1 AND time_slot <= 4),
    
    FOREIGN KEY (theatre_id) REFERENCES theatre(theatre_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (session_id) REFERENCES movie_session(session_id) ON DELETE CASCADE ON UPDATE CASCADE,

    --No two movie sessions can overlap in terms of theatre and the time it’s screened.
    PRIMARY KEY (theatre_id, session_date, time_slot)

)

/*
CREATE TABLE session_locations(
	theatre_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (theatre_id) REFERENCES theatre(theatre_id),
    FOREIGN KEY (session_id) REFERENCES session(session_id),
    PRIMARY KEY (session_id) -- A session cannot have more than one locations
);
*/

CREATE TABLE tickets(
	ticket_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	user_name VARCHAR(100) NOT NULL,
    session_id VARCHAR(50) NOT NULL,
    UNIQUE(user_name,session_id),
	FOREIGN KEY (user_name) REFERENCES audience(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (session_id) REFERENCES movie_session(session_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (ticket_id)
);

CREATE TABLE database_managers(
	user_name VARCHAR(100) NOT NULL,
	manager_password VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_name)
);

DELIMITER $$
DROP TRIGGER IF EXISTS platform_consistency $$

CREATE TRIGGER platform_consistency
BEFORE INSERT
ON ratings FOR EACH ROW

BEGIN
	DECLARE movie_platform VARCHAR(50);
    DECLARE msg VARCHAR(100);

    SELECT platform_id FROM directors_agreements WHERE 
    director_name = (SELECT director_name FROM movies m WHERE m.movie_id = new.movie_id)
    INTO movie_platform;
    
    IF NOT (movie_platform IN (SELECT platform_id FROM subscribes WHERE user_name = new.user_name)) THEN
    signal sqlstate '45000' set message_text = "TriggerError: platform mismatch: user cannot rate the movie";
    END IF;

END $$
DELIMITER ;

DELIMITER $$
DROP TRIGGER IF EXISTS ticket_rate_consistency $$

CREATE TRIGGER ticket_rate_consistency
BEFORE INSERT
ON ratings FOR EACH ROW

BEGIN
    
    IF NOT (new.movie_id IN (SELECT movie_id FROM movie_session WHERE session_id IN 
    (SELECT session_id FROM tickets WHERE user_name = new.user_name))) THEN
    signal sqlstate '45000' set message_text = "TriggerError: ticket mismatch: user cannot rate the movie";
    END IF;
	
END $$
DELIMITER ;

DELIMITER $$
DROP TRIGGER IF EXISTS max_database_managers $$

CREATE TRIGGER max_database_managers
BEFORE INSERT 
ON database_managers FOR EACH ROW
BEGIN
    DECLARE manager_count INT;
    
    SELECT COUNT(*) INTO manager_count
    FROM database_managers;
    
    IF manager_count >= 4 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maximum number of database managers reached.';
    END IF;
END$$
DELIMITER ;


DELIMITER $$
DROP TRIGGER IF EXISTS check_theatre_capacity $$

CREATE TRIGGER check_theatre_capacity
BEFORE INSERT 
ON tickets FOR EACH ROW
BEGIN
    DECLARE theatre_capacity INT;
    DECLARE used_capacity INT;
    
    SELECT t.capacity INTO theatre_capacity
    FROM theatre t WHERE 
    t.theatre_id = (SELECT o.theatre_id FROM occupied_slots o WHERE o.session_id = new.session_id);
    
    SELECT COUNT(*) INTO used_capacity
    FROM tickets t WHERE t.session_id = new.session_id;

    IF theatre_capacity <= used_capacity THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The capacity is full';
    END IF;
END$$
DELIMITER ;


DELIMITER $$
DROP TRIGGER IF EXISTS update_avg_rating $$

CREATE TRIGGER update_avg_rating
BEFORE INSERT 
ON ratings FOR EACH ROW
BEGIN
    DECLARE avg_rating FLOAT;
    DECLARE rating_count INT;
    DECLARE avg_new FLOAT;
    
    SELECT m.average_rating INTO avg_rating
    FROM movies m WHERE 
    m.movie_id = new.movie_id;
    
    SELECT COUNT(*) INTO rating_count
    FROM ratings r WHERE r.movie_id = new.movie_id;

    SET avg_new = (avg_rating*rating_count+new.rating)/(rating_count+1);
    
    UPDATE movies
    SET average_rating = avg_new
    WHERE movie_id = new.movie_id;

END$$
DELIMITER ;


DELIMITER $$
DROP TRIGGER IF EXISTS check_predecessor $$

CREATE TRIGGER check_predecessor
BEFORE INSERT 
ON tickets FOR EACH ROW
BEGIN
    DECLARE mov_id VARCHAR(50);
    DECLARE unwatched INT;
    SELECT movie_id INTO mov_id FROM movie_session WHERE session_id=new.session_id;
    
    SELECT COUNT(*) INTO unwatched FROM (SELECT predecessor_id FROM movie_predecessors WHERE successor_id=mov_id
    EXCEPT
    SELECT ms.movie_id FROM movie_session ms WHERE ms.session_id IN (SELECT session_id FROM tickets WHERE user_id = new.user_id));
    ;

    IF unwatched > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Watch predecessors first!';



END$$
DELIMITER ;

