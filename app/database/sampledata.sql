-- Inserting data into rating_platforms table
INSERT INTO rating_platforms (platform_id, platform_name)
VALUES
    ('P1', 'Platform A'),
    ('P2', 'Platform B');

-- Inserting data into directors_agreements table
INSERT INTO directors_agreements (user_name, director_password, director_name, director_surname, nationality, platform_id)
VALUES
    ('director1', 'password1', 'John', 'Doe', 'USA', 'P1'),
    ('director2', 'password2', 'Jane', 'Smith', 'UK', 'P2');

-- Inserting data into audience table
INSERT INTO audience (user_name, audience_password, audience_name, audience_surname)
VALUES
    ('audience1', 'password3', 'Alice', 'Johnson'),
    ('audience2', 'password4', 'Bob', 'Williams');

-- Inserting data into subscribes table
INSERT INTO subscribes (user_name, platform_id)
VALUES
    ('audience1', 'P1'),
    ('audience2', 'P2');

-- Inserting data into movies table
INSERT INTO movies (movie_id, movie_name, director_name, duration, average_rating)
VALUES
    ('M1', 'Movie 1', 'director1', 2, 0),
    ('M2', 'Movie 2', 'director2', 1, 0);

-- Inserting data into movie_predecessors table
INSERT INTO movie_predecessors (successor_id, predecessor_id)
VALUES
    ('M2', 'M1');

-- Inserting data into genres table
INSERT INTO genres (genre_id, genre_name)
VALUES
    ('G1', 'Action'),
    ('G2', 'Drama');

-- Inserting data into movie_genres table
INSERT INTO movie_genres (movie_id, genre_id)
VALUES
    ('M1', 'G1'),
    ('M2', 'G2');

-- Inserting data into theatre table
INSERT INTO theatre (theatre_id, theatre_name, capacity, district)
VALUES
    ('T1', 'Theatre A', 100, 'District X'),
    ('T2', 'Theatre B', 150, 'District Y');

-- Inserting data into movie_session table
INSERT INTO movie_session (session_id, movie_id)
VALUES
    ('S1', 'M1'),
    ('S2', 'M2');

-- Inserting data into occupied_slots table
INSERT INTO occupied_slots (session_id, theatre_id, session_date, time_slot)
VALUES
    ('S1', 'T1', '2023-05-30', 1),
    ('S2', 'T2', '2023-05-31', 2);

-- Inserting data into tickets table
INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
    ('TICKET1', 'audience1', 'S1');

-- Inserting data into ratings table
INSERT INTO ratings (movie_id, user_name, rating)
VALUES
    ('M1', 'audience1', 4);

-- Inserting data into database_managers table
INSERT INTO database_managers (user_name, manager_password)
VALUES
    ('manager1', 'managerpassword1');
