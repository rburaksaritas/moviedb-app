-- Sample Database Managers Data
INSERT INTO database_managers (user_name, manager_password) VALUES
('manager1', 'managerpass1'),
('manager2', 'managerpass2'),
('manager35', 'managerpass35');

-- Sample Genre Data
INSERT INTO genres (genre_id, genre_name) VALUES
('80001', 'Animation'),
('80002', 'Comedy'),
('80003', 'Adventure'),
('80004', 'Real Story'),
('80005', 'Thriller'),
('80006', 'Drama');

-- Sample Rating Platforms Data
INSERT INTO rating_platforms (platform_id, platform_name) VALUES
('10130', 'IMDB'),
('10131', 'Letterboxd'),
('10132', 'FilmIzle'),
('10133', 'Filmora'),
('10134', 'BollywoodMDB');

INSERT INTO movies (movie_id, movie_name, duration, average_rating)
VALUES
('movie1', 'The Shawshank Redemption', 142, 9.3),
('movie2', 'The Godfather', 175, 9.2),
('movie3', 'Pulp Fiction', 154, 8.9),
('movie4', 'Fight Club', 139, 8.8),
('movie5', 'The Dark Knight', 152, 9.0);

-- Insert data into the 'directors' table
INSERT INTO directors (user_name, director_password, director_name, director_surname, nationality, platform_id)
VALUES
    ('director1', 'password1', 'Director 1', 'Surname 1', 'Nationality 1', 'platform1'),
    ('director2', 'password2', 'Director 2', 'Surname 2', 'Nationality 2', 'platform2');

-- Insert data into the 'audience' table
INSERT INTO audience (user_name, audience_password, audience_name, audience_surname)
VALUES
    ('audience1', 'password1', 'Audience 1', 'Surname 1'),
    ('audience2', 'password2', 'Audience 2', 'Surname 2');

-- Insert data into the 'rating_platforms' table
INSERT INTO rating_platforms (platform_id, platform_name)
VALUES
    ('platform1', 'Platform 1'),
    ('platform2', 'Platform 2');

-- Insert data into the 'agreement' table
INSERT INTO agreement (user_name, platform_id)
VALUES
    ('director1', 'platform1');

-- Insert data into the 'subscribes' table
INSERT INTO subscribes (user_name, platform_id)
VALUES
    ('audience1', 'platform1'),
    ('audience2', 'platform2');

-- Insert data into the 'movies' table
INSERT INTO movies (movie_id, movie_name, duration, average_rating)
VALUES
    ('movie6', 'Movie 6', 120, 7.5),
    ('movie7', 'Movie 7', 150, 8.2);

-- Insert data into the 'ratings' table
INSERT INTO ratings (movie_id, user_name, duration, rating)
VALUES
    ('movie1', 'audience1', 120, 7.5),
    ('movie1', 'audience2', 120, 8.0),
    ('movie2', 'audience1', 150, 8.5);

-- Insert data into the 'movie_predecessors' table
INSERT INTO movie_predecessors (successor_id, predecessor_id)
VALUES
    ('movie2', 'movie1');

-- Insert data into the 'directed_by' table
INSERT INTO directed_by (movie_id, user_name)
VALUES
    ('movie1', 'director1'),
    ('movie2', 'director1');

-- Insert data into the 'genres' table
INSERT INTO genres (genre_id, genre_name)
VALUES
    ('genre1', 'Genre 1'),
    ('genre2', 'Genre 2');

-- Insert data into the 'movie_genres' table
INSERT INTO movie_genres (movie_id, genre_id)
VALUES
    ('movie1', 'genre1'),
    ('movie2', 'genre2');

-- Insert data into the 'session' table
INSERT INTO session (session_id, session_date, time_slot)
VALUES
    ('session1', '2023-05-20', 1),
    ('session2', '2023-05-21', 2);

-- Insert data into the 'movie_session' table
INSERT INTO movie_session (movie_id, session_id)
VALUES
    ('movie1', 'session1'),
    ('movie2', 'session2');

-- Insert data into the 'theatre' table
INSERT INTO theatre (theatre_id, theatre_name, capacity, district)
VALUES
    ('theatre1', 'Theatre 1', 100, 'District 1'),
    ('theatre2', 'Theatre 2', 150, 'District 2');

-- Insert data into the 'session_locations' table
INSERT INTO session_locations (theatre_id, session_id)
VALUES
    ('theatre1', 'session1'),
    ('theatre2', 'session2');

-- Insert data into the 'tickets' table
INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
    ('ticket1', 'audience1', 'session1'),
    ('ticket2', 'audience2', 'session2');

