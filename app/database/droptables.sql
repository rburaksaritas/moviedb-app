-- Dropping tables in reverse order to avoid foreign key constraint violations

-- Drop triggers
DROP TRIGGER IF EXISTS platform_consistency;
DROP TRIGGER IF EXISTS ticket_rate_consistency;
DROP TRIGGER IF EXISTS max_database_managers;
DROP TRIGGER IF EXISTS check_theatre_capacity;
DROP TRIGGER IF EXISTS update_avg_rating;
DROP TRIGGER IF EXISTS check_predecessor;

-- Drop tables
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS occupied_slots;
DROP TABLE IF EXISTS movie_session;
DROP TABLE IF EXISTS theatre;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS movie_predecessors;
DROP TABLE IF EXISTS movie_genres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS subscribes;
DROP TABLE IF EXISTS audience;
DROP TABLE IF EXISTS directors_agreements;
DROP TABLE IF EXISTS rating_platforms;
DROP TABLE IF EXISTS database_managers;