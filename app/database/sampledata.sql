-- Insert rating platforms
INSERT INTO rating_platforms (platform_id, platform_name)
VALUES
    ('10130', 'IMDB'),
    ('10131', 'Letterboxd'),
    ('10132', 'FilmIzle'),
    ('10133', 'Filmora'),
    ('10134', 'BollywoodMDB');

-- Insert directors agreements
INSERT INTO directors_agreements (user_name, director_password, director_name, director_surname, nationality, platform_id)
VALUES
    ('he.gongmin', 'passwordpass', 'He', 'Gongmin', 'Turkish', '10130'),
    ('carm.galian', 'madrid9897', 'Carmelita', 'Galiano', 'Turkish', '10131'),
    ('kron.helene', 'helenepass', 'Helene', 'Kron', 'French', '10130'),
    ('peter.weir', 'peter_weir879', 'Peter', 'Weir', 'Spanish', '10131'),
    ('kyle.balda', 'mynameiskyle9', 'Kyle', 'Balda', 'German', '10132');

-- Insert audience
INSERT INTO audience (user_name, audience_password, audience_name, audience_surname)
VALUES
    ('steven.jobs', 'apple123', 'Steven', 'Jobs'),
    ('minion.lover', 'bello387', 'Felonius', 'Gru'),
    ('steve.wozniak', 'pass4321', 'Ryan', 'Andrews'),
    ('arzucan.ozgur', 'deneme123', 'Arzucan', 'Ozgur'),
    ('egemen.isguder', 'deneme124', 'Egemen', 'Isguder'),
    ('busra.oguzoglu', 'deneme125', 'Busra', 'Oguzoglu');

-- Insert subscribes
INSERT INTO subscribes (user_name, platform_id)
VALUES
    ('steven.jobs', '10130'),
    ('steven.jobs', '10131'),
    ('steve.wozniak', '10131'),
    ('arzucan.ozgur', '10130'),
    ('egemen.isguder', '10132'),
    ('busra.oguzoglu', '10131');

-- Insert movies
INSERT INTO movies (movie_id, movie_name, director_name, duration, average_rating)
VALUES
    ('20001', 'Despicable Me 2', 'kyle.balda', 2, 5),
    ('20002', 'Catch Me If You Can', 'he.gongmin', 2, NULL),
    ('20003', 'The Bone Collector', 'carm.galian', 2, NULL),
    ('20004', 'Eagle Eye', 'kron.helene', 2, 5),
    ('20005', 'Minions: The Rise Of Gru', 'kyle.balda', 1, 5),
    ('20006', 'The Minions', 'kyle.balda', 1, 5),
    ('20007', 'The Truman Show', 'peter.weir', 3, 5);

-- Insert movie predecessors
INSERT INTO movie_predecessors (successor_id, predecessor_id)
VALUES
    ('20006', '20001'),
    ('20007', '20006');

-- Insert genres
INSERT INTO genres (genre_id, genre_name)
VALUES
    ('80001', 'Animation'),
    ('80002', 'Comedy'),
    ('80003', 'Adventure'),
    ('80004', 'Real Story'),
    ('80005', 'Thriller'),
    ('80006', 'Drama');

-- Insert movie genres
INSERT INTO movie_genres (movie_id, genre_id)
VALUES
    ('20001', '80001'),
    ('20001', '80002'),
    ('20002', '80003'),
    ('20002', '80004'),
    ('20003', '80005'),
    ('20004', '80003'),
    ('20004', '80006'),
    ('20005', '80001'),
    ('20005', '80002'),
    ('20006', '80001'),
    ('20006', '80002'),
    ('20007', '80002'),
    ('20007', '80006');

-- Insert theatre
INSERT INTO theatre (theatre_id, theatre_name, capacity, district)
VALUES
    ('40001', 'Sisli_1', 300, 'Sisli'),
    ('40002', 'Sisli_2', 200, 'Sisli'),
    ('40003', 'Besiktas1', 100, 'Besiktas'),
    ('40004', 'Besiktas2', 100, 'Besiktas'),
    ('40005', 'Besiktas3', 500, 'Besiktas');

-- Insert movie sessions
INSERT INTO movie_session (session_id, movie_id)
VALUES
    ('50001', '20001'),
    ('50002', '20001'),
    ('50003', '20001'),
    ('50004', '20002'),
    ('50005', '20003'),
    ('50006', '20004'),
    ('50007', '20005'),
    ('50008', '20006'),
    ('50009', '20007');

-- Insert occupied slots
INSERT INTO occupied_slots (session_id, theatre_id, session_date, time_slot)
VALUES
    ('50001', '40001', '15.03.2023', 1),
    ('50002', '40001', '15.03.2023', 3),
    ('50003', '40002', '15.03.2023', 1),
    ('50004', '40002', '15.03.2023', 3),
    ('50005', '40003', '16.03.2023', 1),
    ('50006', '40003', '16.03.2023', 3),
    ('50007', '40004', '16.03.2023', 1),
    ('50008', '40004', '16.03.2023', 3),
    ('50009', '40005', '16.03.2023', 1);

-- Insert tickets
INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100001', 'steven.jobs', '50001');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100002', 'steve.wozniak', '50004');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100003', 'steve.wozniak', '50005');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100004', 'arzucan.ozgur', '50006');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100005', 'egemen.isguder', '50001');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100006', 'egemen.isguder', '50004');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100007', 'egemen.isguder', '50008');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100008', 'egemen.isguder', '50007');

INSERT INTO tickets (ticket_id, user_name, session_id)
VALUES
('100009', 'busra.oguzoglu', '50009');


-- Insert ratings
INSERT INTO ratings (movie_id, user_name, rating)
VALUES ('20001', 'egemen.isguder', 5);

INSERT INTO ratings (movie_id, user_name, rating)
VALUES ('20005', 'egemen.isguder', 5);

INSERT INTO ratings (movie_id, user_name, rating)
VALUES ('20006', 'egemen.isguder', 5);

INSERT INTO ratings (movie_id, user_name, rating)
VALUES ('20004', 'arzucan.ozgur', 5);

INSERT INTO ratings (movie_id, user_name, rating)
VALUES ('20007', 'busra.oguzoglu', 5);

-- Insert managers
INSERT INTO database_managers (user_name, manager_password)
VALUES
    ('manager1', 'managerpass1'),
    ('manager2', 'managerpass2'),
    ('manager35', 'managerpass35');
