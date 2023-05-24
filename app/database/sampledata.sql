-- Inserting managers
INSERT INTO database_managers (user_name, manager_password)
VALUES
    ('manager1', 'managerpass1'),
    ('manager2', 'managerpass2'),
    ('manager35', 'managerpass35');

-- Inserting genres
INSERT INTO genres (genre_id, genre_name)
VALUES
    ('80001', 'Animation'),
    ('80002', 'Comedy'),
    ('80003', 'Adventure'),
    ('80004', 'Real Story'),
    ('80005', 'Thriller'),
    ('80006', 'Drama');

-- Inserting rating platforms
INSERT INTO rating_platforms (platform_id, platform_name)
VALUES
    ('10130', 'IMDB'),
    ('10131', 'Letterboxd'),
    ('10132', 'FilmIzle'),
    ('10133', 'Filmora'),
    ('10134', 'BollywoodMDB');

-- Inserting directors
INSERT INTO directors (user_name, director_password, director_name, director_surname, nationality, platform_id)
VALUES
    ('director1', 'password1', 'Director 1', 'Surname 1', 'Nationality 1', '10130'),
    ('director2', 'password2', 'Director 2', 'Surname 2', 'Nationality 2', '10131');

-- Inserting audience
INSERT INTO audience (user_name, audience_password, audience_name, audience_surname)
VALUES
    ('audience1', 'password1', 'Audience 1', 'Surname 1'),
    ('audience2', 'password2', 'Audience 2', 'Surname 2'),
    ('audience3', 'password3', 'Audience 3', 'Surname 3'),
    ('audience4', 'password4', 'Audience 4', 'Surname 4'),
    ('audience5', 'password5', 'Audience 5', 'Surname 5');

-- Inserting agreement
INSERT INTO agreement (user_name, platform_id)
VALUES
    ('director1', '10130'),
    ('director2', '10131');

-- Inserting subscribes
INSERT INTO subscribes (user_name, platform_id)
VALUES
    ('audience1', '10130'),
    ('audience2', '10130'),
    ('audience3', '10131'),
    ('audience4', '10132');

-- Inserting movies
INSERT INTO movies (movie_id, movie_name, duration, average_rating)
VALUES
    ('movie1', 'The Shawshank Redemption', 142, 9.3),
    ('movie2', 'The Godfather', 175, 9.2),
    ('movie3', 'Pulp Fiction', 154, 8.9),
    ('movie4', 'Fight Club', 139, 8.8),
    ('movie5', 'The Dark Knight', 152, 9.0),
    ('movie6', 'Movie 6', 120, 7.5),
    ('movie7', 'Movie 7', 150, 8.2),
    ('movie8', 'Movie 8', 110, 7.8),
    ('movie9', 'Movie 9', 130, 8.1);

-- Inserting ratings
INSERT INTO ratings (movie_id, user_name, duration, rating)
VALUES
    ('movie1', 'audience1', 120, 7.5),
    ('movie1', 'audience2', 120, 8.0),
    ('movie2', 'audience1', 150, 8.5),
    ('movie3', 'audience3', 125, 8.3),
    ('movie3', 'audience4', 125, 7.6),
    ('movie4', 'audience3', 140, 9.0),
    ('movie4', 'audience4', 140, 8.5),
    ('movie5', 'audience3', 135, 8.7),
    ('movie5', 'audience4', 135, 8.2),
    ('movie6', 'audience3', 120, 7.9),
    ('movie6', 'audience4', 120, 7.4),
    ('movie7', 'audience3', 155, 8.6),
    ('movie7', 'audience4', 155, 8.1),
    ('movie8', 'audience3', 110, 7.7),
    ('movie8', 'audience4', 110, 7.2),
    ('movie9', 'audience3', 130, 8.0),
    ('movie9', 'audience4', 130, 7.5);

-- Inserting movie_predecessors
INSERT INTO movie_predecessors (successor_id, predecessor_id)
VALUES
    ('movie2', 'movie1'),
    ('movie3', 'movie1'),
    ('movie5', 'movie2'),
    ('movie6', 'movie2'),
    ('movie7', 'movie2'),
    ('movie8', 'movie3'),
    ('movie9', 'movie4');

-- Inserting directed_by
INSERT INTO directed_by (movie_id, user_name)
VALUES
    ('movie1', 'director1'),
    ('movie2', 'director1'),
    ('movie3', 'director1'),
    ('movie4', 'director1'),
    ('movie5', 'director2'),
    ('movie6', 'director2'),
    ('movie7', 'director2'),
    ('movie8', 'director1'),
    ('movie9', 'director1');

-- Inserting movie_genres
INSERT INTO movie_genres (movie_id, genre_id)
VALUES
    ('movie1', '80001'),
    ('movie2', '80002'),
    ('movie3', '80003'),
    ('movie4', '80004'),
    ('movie5', '80003'),
    ('movie6', '80005'),
    ('movie7', '80006'),
    ('movie8', '80004'),
    ('movie9', '80005');

-- Inserting session
INSERT INTO session (session_id, session_date, time_slot)
VALUES
    ('session1', '2023-05-20', 1),
    ('session2', '2023-05-21', 2),
    ('session3', '2023-05-22', 1),
    ('session4', '2023-05-23', 2),
    ('session5', '2023-05-24', 3);

-- Inserting movie_session
INSERT INTO movie_session (movie_id, session_id)
VALUES
    ('movie1', 'session1'),
    ('movie2', 'session2'),
    ('movie3', 'session3'),
    ('movie5', 'session4'),
    ('movie6', 'session4'),
    ('movie7', 'session5'),
    ('movie8', 'session5'),
    ('movie9', 'session5');

-- Inserting theatre
INSERT INTO theatre (theatre_id, theatre_name, capacity, district)
VALUES
    ('theatre1', 'Theatre 1', 100, 'District 1'),
    ('theatre2', 'Theatre 2', 150, 'District 2'),
    ('theatre3', 'Theatre 3', 120, 'District 3'),
    ('theatre4', 'Theatre 4', 140, 'District 4');

-- Inserting session_locations
INSERT INTO session_locations (theatre_id, session_id)
VALUES
    ('theatre1', 'session1'),
    ('theatre2', 'session2'),
    ('theatre3', 'session3'),
    ('theatre4', 'session4'),
    ('theatre4', 'session5');

-- Inserting tickets
INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
    ('ticket1', 'audience1', 'session1'),
    ('ticket2', 'audience2', 'session2'),
    ('ticket3', 'audience3', 'session3'),
    ('ticket4', 'audience4', 'session4');
