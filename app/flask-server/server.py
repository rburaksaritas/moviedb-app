from flask import Flask, request, redirect, render_template, jsonify
import mysql.connector
from login import handle_login
from db_config import db_config

app = Flask(__name__)

# Execute query
def execute_query(query, args=None):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute(query, args)
    result = cursor.fetchall()
    connection.commit()
    cursor.close()
    connection.close()
    return result

# Login route
@app.route("/login", methods=["POST"])
def login():
    try:
        # Get the username, password, and role from the request body
        data = request.get_json()
        user_name = data.get('user_name')
        password = data.get('password')
        role = data.get('role')

        # Call the handle_login function from the login module
        result = handle_login(user_name, password, role, db_config)

        if result['status'] == 'success':
            # Login successful
            return {"status": "success", "message": "Login successful"}
        else:
            # Login failed, render the login page with an error message
            return {"error": "Invalid username, password, or role"}

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Database Manager
# Audience Management Routes
@app.route("/manager-dashboard/audience", methods=["POST"])
def add_audience():
    try:
        # Get the audience data from the request body
        data = request.get_json()
        user_name = data.get('user_name')
        audience_password = data.get('audience_password')
        audience_name = data.get('audience_name')
        audience_surname = data.get('audience_surname')

        # Perform the necessary database operation to add a new audience
        # Insert the audience data into the 'audience' table
        query = "INSERT INTO audience (user_name, audience_password, audience_name, audience_surname) " \
                "VALUES (%s, %s, %s, %s)"
        args = (user_name, audience_password, audience_name, audience_surname)
        result = execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Audience added successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}


@app.route("/manager-dashboard/audience", methods=["DELETE"])
def delete_audience():
    try:
        # Get the audience user_name from the request body
        data = request.get_json()
        user_name = data.get('user_name')

        # Perform the necessary database operation to delete an audience
        # Delete the audience with the provided user_name from the 'audience' table
        query = "DELETE FROM audience WHERE user_name = %s"
        args = (user_name,)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Audience deleted successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}


@app.route("/manager-dashboard/audience", methods=["GET"])
def get_audience_list():
    try:
        # Perform the necessary database operation to fetch the list of audiences
        # Fetch all the audience data from the 'audience' table
        query = "SELECT user_name, audience_password, audience_name, audience_surname FROM audience"
        result = execute_query(query)
        
        # Transform the result into a list of dictionaries
        audience_list = []
        for row in result:
            user_name, audience_password, audience_name, audience_surname = row
            audience = {
                "user_name": user_name,
                "audience_password": audience_password,
                "audience_name": audience_name,
                "audience_surname": audience_surname
            }
            audience_list.append(audience)

        print('Retrieved Audience List:', audience_list)  # Print the retrieved audience data

        # Return the audience list as a JSON response
        return jsonify(audience_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}


# Director Management Routes
@app.route("/manager-dashboard/director", methods=["POST"])
def add_director():
    try:
        # Get the director data from the request body
        data = request.get_json()
        user_name = data.get('user_name')
        director_password = data.get('director_password')
        director_name = data.get('director_name')
        director_surname = data.get('director_surname')
        nationality = data.get('nationality')
        platform_id = data.get('platform_id')

        # Perform the necessary database operation to add a new director
        # Insert the director data into the 'directors' table
        query = "INSERT INTO directors (user_name, director_password, director_name, director_surname, " \
                "nationality, platform_id) VALUES (%s, %s, %s, %s, %s, %s)"
        args = (user_name, director_password, director_name, director_surname, nationality, platform_id)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Director added successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}


@app.route("/manager-dashboard/director", methods=["PUT"])
def change_director_platform():
    try:
        # Get the director user_name and new platform_id from the request body
        data = request.get_json()
        user_name = data.get('user_name')
        platform_id = data.get('platform_id')

        # Perform the necessary database operation to change the platform ID of a director
        # Update the platform_id of the director with the provided user_name in the 'directors' table
        query = "UPDATE directors SET platform_id = %s WHERE user_name = %s"
        args = (platform_id, user_name)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Platform ID of director updated successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}


@app.route("/manager-dashboard/director", methods=["GET"])
def get_director_list():
    try:
        # Perform the necessary database operation to fetch the list of directors
        # Fetch all the director data from the 'directors' table
        query = "SELECT user_name, director_password, director_name, director_surname, nationality, platform_id " \
                "FROM directors"
        result = execute_query(query)

        # Transform the result into a list of dictionaries
        director_list = []
        for row in result:
            user_name, director_password, director_name, director_surname, nationality, platform_id = row
            director = {
                "user_name": user_name,
                "director_password": director_password,
                "director_name": director_name,
                "director_surname": director_surname,
                "nationality": nationality,
                "platform_id": platform_id
            }
            director_list.append(director)

        # Return the director list as a JSON response
        return jsonify(director_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Ratings management routes
@app.route("/manager-dashboard/ratings", methods=["POST"])
def search_ratings():
    try:
        # Get the user_name from the request body
        data = request.get_json()
        user_name = data.get('user_name')

        # Perform the necessary database operation to fetch the ratings for the given user_name
        # Fetch the movie_id, movie_name, and rating from the 'ratings' table for the provided user_name
        query = "SELECT ratings.movie_id, movies.movie_name, ratings.rating FROM ratings " \
                "JOIN movies ON ratings.movie_id = movies.movie_id WHERE ratings.user_name = %s"
        args = (user_name,)
        result = execute_query(query, args)

        # Transform the result into a list of dictionaries
        rating_list = []
        for row in result:
            movie_id, movie_name, rating = row
            rating_data = {
                "movie_id": movie_id,
                "movie_name": movie_name,
                "rating": rating
            }
            rating_list.append(rating_data)

        # Return the rating list as a JSON response
        return jsonify(rating_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Movies management routes
@app.route("/manager-dashboard/movies", methods=["POST"])
def search_movies():
    try:
        # Get the director username from the request body
        data = request.get_json()
        user_name = data.get('user_name')

        # Perform the necessary database operation to fetch the movies by director username
        # Fetch the movie_id, movie_name, theatre_id, district, and time_slot from the relevant tables
        query = """
            SELECT movies.movie_id, movies.movie_name, theatre.theatre_id, theatre.district, session.time_slot
            FROM movies
            JOIN directed_by ON movies.movie_id = directed_by.movie_id
            JOIN movie_session ON movies.movie_id = movie_session.movie_id
            JOIN session ON movie_session.session_id = session.session_id
            JOIN session_locations ON session.session_id = session_locations.session_id
            JOIN theatre ON session_locations.theatre_id = theatre.theatre_id
            WHERE directed_by.user_name = %s
            """


        args = (user_name,)
        result = execute_query(query, args)

        # Transform the result into a list of dictionaries
        movie_list = []
        for row in result:
            movie_id, movie_name, theatre_id, district, time_slot = row
            movie = {
                "movie_id": movie_id,
                "movie_name": movie_name,
                "theatre_id": theatre_id,
                "district": district,
                "time_slot": time_slot
            }
            movie_list.append(movie)

        # Return the movie list as a JSON response
        return jsonify(movie_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Average rating management routes
@app.route("/manager-dashboard/average-rating", methods=["POST"])
def get_movie_rating():
    try:
        # Get the movie ID from the request body
        data = request.get_json()
        movie_id = data.get('movie_id')

        # Perform the necessary database operation to fetch the movie rating
        query = """
        SELECT movies.movie_id, movies.movie_name, AVG(ratings.rating) AS average_rating
        FROM movies
        JOIN ratings ON movies.movie_id = ratings.movie_id
        WHERE movies.movie_id = %s
        GROUP BY movies.movie_id
        """
        args = (movie_id,)
        result = execute_query(query, args)

        # Check if the movie rating exists
        if result:
            rating_list = []
            for row in result:
                movie_id, movie_name, average_rating = row
                rating = {
                    "movie_id": movie_id,
                    "movie_name": movie_name,
                    "average_rating": average_rating
                }
                rating_list.append(rating)
            return jsonify(rating_list)
        else:
            return {"error": "Movie rating not found."}

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Director Dashboard Routes
# Theaters tab
# Get theaters for a given slot
@app.route("/director-dashboard/theatres", methods=["GET"])
def get_theatres_for_slot():
    try:
        # Get the time_slot from the request parameters
        time_slot = request.args.get('time_slot')

        # Perform the necessary database operation to fetch the theaters available for a given slot
        query = """
            SELECT theatre_id, district, capacity
            FROM theatre
            WHERE theatre_id IN (
                SELECT theatre_id
                FROM session_locations
                WHERE session_id IN (
                    SELECT session_id
                    FROM session
                    WHERE time_slot = %s
                )
            )
            """
        args = (time_slot,)
        result = execute_query(query, args)

        # Transform the result into a list of dictionaries
        theatre_list = []
        for row in result:
            theatre_id, district, capacity = row
            theatre = {
                "theatre_id": theatre_id,
                "district": district,
                "capacity": capacity
            }
            theatre_list.append(theatre)

        # Return the theatre list as a JSON response
        return jsonify(theatre_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Movies tab
# List movies
@app.route("/director-dashboard/my-movies", methods=["GET"])
def get_director_movies():
    try:
        # Get the director username from the request parameters
        user_name = request.args.get('user_name')

        # Perform the necessary database operation to fetch the movies directed by the given director
        query = """
            SELECT movies.movie_id, movies.movie_name, session_locations.theatre_id, session.time_slot,
                GROUP_CONCAT(movie_predecessors.predecessor_id SEPARATOR ', ') AS predecessors
            FROM movies
            LEFT JOIN movie_predecessors ON movies.movie_id = movie_predecessors.successor_id
            LEFT JOIN movie_session ON movies.movie_id = movie_session.movie_id
            LEFT JOIN session ON movie_session.session_id = session.session_id
            LEFT JOIN session_locations ON session_locations.session_id = session.session_id
            WHERE movies.movie_id IN (
                SELECT movie_id
                FROM directed_by
                WHERE user_name = %s
            )
            GROUP BY movies.movie_id, movies.movie_name, session_locations.theatre_id, session.time_slot
            ORDER BY movies.movie_id ASC
            """
        args = (user_name,)
        result = execute_query(query, args)

        # Transform the result into a list of dictionaries
        movie_list = []
        for row in result:
            movie_id, movie_name, theatre_id, time_slot, predecessors = row
            movie = {
                "movie_id": movie_id,
                "movie_name": movie_name,
                "theatre_id": theatre_id,
                "time_slot": time_slot,
                "predecessors": predecessors
            }
            movie_list.append(movie)

        # Return the movie list as a JSON response
        return jsonify(movie_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Add new movie
@app.route("/director-dashboard/add-movie", methods=["POST"])
def add_movie():
    try:
        # Get the movie data from the request body
        data = request.get_json()
        movie_id = data.get('movie_id')
        movie_name = data.get('movie_name')
        user_name = data.get('user_name') # director's username
        theatre_id = data.get('theatre_id')
        time_slot = data.get('time_slot')
        session_id = data.get('session_id') # new session id provided by director
        session_date = data.get('session_date') # new session time provided by director
        
        # Perform the necessary database operation to add a new movie
        # Insert the movie data into the 'movies' table
        query = "INSERT INTO movies (movie_id, movie_name) VALUES (%s, %s)"
        args = (movie_id, movie_name)
        execute_query(query, args)

        # Get the platform_id of the director
        query = "SELECT platform_id FROM directors WHERE user_name = %s"
        args = (user_name,)
        result = execute_query(query, args)
        platform_id = result[0][0]

        # Insert new session
        query = "INSERT INTO session (session_id, session_date, time_slot) VALUES (%s, %s)"
        args = (session_id, time_slot)
        execute_query(query, args)

        # Link the new session to the movie
        query = "INSERT INTO movie_session (movie_id, session_id) VALUES (%s, %s)"
        args = (movie_id, session_id)
        execute_query(query, args)

        # Link the new session to the theatre
        query = "INSERT INTO session_locations (theatre_id, session_id) VALUES (%s, %s)"
        args = (theatre_id, session_id)
        execute_query(query, args)

        # Link the new movie to the director
        query = "INSERT INTO directed_by (movie_id, user_name) VALUES (%s, %s)"
        args = (movie_id, user_name)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Movie added successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}


# Add movie predecessor
@app.route("/director-dashboard/add-predecessor", methods=["POST"])
def add_predecessor():
    try:
        # Get the predecessor data from the request body
        data = request.get_json()
        successor_id = data.get('successor_id')
        predecessor_id = data.get('predecessor_id')

        # Perform the necessary database operation to add a new predecessor
        # Insert the predecessor data into the 'movie_predecessors' table
        query = "INSERT INTO movie_predecessors (successor_id, predecessor_id) VALUES (%s, %s)"
        args = (successor_id, predecessor_id)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Predecessor added successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Update movie name
@app.route("/director-dashboard/update-movie-name", methods=["PUT"])
def update_movie_name():
    try:
        # Get the movie ID and new movie name from the request body
        data = request.get_json()
        movie_id = data.get('movie_id')
        movie_name = data.get('new_name')

        # Perform the necessary database operation to update the movie name
        query = "UPDATE movies SET movie_name = %s WHERE movie_id = %s"
        args = (movie_name, movie_id)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Movie name updated successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Audience tab
# List audience for a given movie id 
@app.route("/director-dashboard/audience-list", methods=["GET"])
def get_audience_list_for_movie():
    try:
        # Get the movie ID from the request parameters
        movie_id = request.args.get('movie_id')

        # Perform the necessary database operation to fetch the audience who bought tickets for the given movie
        query = """
            SELECT audience.user_name, audience.audience_name, audience.audience_surname
            FROM audience
            INNER JOIN tickets ON audience.user_name = tickets.user_name
            INNER JOIN movie_session ON tickets.session_id = movie_session.session_id
            WHERE movie_session.movie_id = %s
            """
        args = (movie_id,)
        result = execute_query(query, args)

        # Transform the result into a list of dictionaries
        audience_list = []
        for row in result:
            user_name, audience_name, audience_surname = row
            audience = {
                "user_name": user_name,
                "name": audience_name,
                "surname": audience_surname
            }
            audience_list.append(audience)

        # Return the audience list as a JSON response
        return jsonify(audience_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Audience Dashboard Routes
# Movies Tab
# Movies List
@app.route("/audience-dashboard/movies-list", methods=["GET"])
def get_movies_list():
    try:
        # Perform the necessary database operation to fetch the movies list
        query = """
        SELECT movies.movie_id, movies.movie_name, directors.director_surname, rating_platforms.platform_name, 
               session_locations.theatre_id, session.time_slot, GROUP_CONCAT(movie_predecessors.predecessor_id SEPARATOR ', ') AS predecessors
        FROM movies
        JOIN directed_by ON movies.movie_id = directed_by.movie_id
        JOIN directors ON directed_by.user_name = directors.user_name
        JOIN rating_platforms ON directors.platform_id = rating_platforms.platform_id
        JOIN movie_session ON movies.movie_id = movie_session.movie_id
        JOIN session ON movie_session.session_id = session.session_id
        JOIN session_locations ON session_locations.session_id = session.session_id
        LEFT JOIN movie_predecessors ON movies.movie_id = movie_predecessors.successor_id
        GROUP BY movies.movie_id, movies.movie_name, directors.director_surname, rating_platforms.platform_name, 
                 session_locations.theatre_id, session.time_slot
        """
        result = execute_query(query)

        # Transform the result into a list of dictionaries
        movies_list = []
        for row in result:
            movie_id, movie_name, director_surname, platform, theatre_id, time_slot, predecessors = row
            movie = {
                "movie_id": movie_id,
                "movie_name": movie_name,
                "director_surname": director_surname,
                "platform": platform,
                "theatre_id": theatre_id,
                "time_slot": time_slot,
                "predecessors": predecessors
            }
            movies_list.append(movie)

        # Return the movies list as a JSON response
        return jsonify(movies_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Tickets tab
# Session List
@app.route("/audience-dashboard/session-list", methods=["GET"])
def get_session_list():
    try:
        # Perform the necessary database operation to fetch the session list
        query = "SELECT session_id FROM session"
        result = execute_query(query)

        # Transform the result into a list of session IDs
        session_list = [row[0] for row in result]

        # Return the session list as a JSON response
        return jsonify(session_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Tickets List
@app.route("/audience-dashboard/tickets-list", methods=["GET"])
def get_tickets_list():
    try:
        # Get the username from the request parameters
        user_name = request.args.get('user_name')

        # Perform the necessary database operation to fetch the tickets list for the given user
        query = """
            SELECT
            movies.movie_id,
            movies.movie_name,
            tickets.session_id,
            ratings.rating,
            (SELECT AVG(rating) FROM ratings WHERE movie_id = movie_session.movie_id) AS overall_rating
            FROM
            tickets
            JOIN movie_session ON tickets.session_id = movie_session.session_id
            JOIN movies ON movie_session.movie_id = movies.movie_id
            LEFT JOIN ratings ON movie_session.movie_id = ratings.movie_id AND tickets.user_name = ratings.user_name
            WHERE
            tickets.user_name = %s
            """
        args = (user_name,)
        result = execute_query(query, args)

        # Transform the result into a list of dictionaries
        tickets_list = []
        for row in result:
            movie_id, movie_name, session_id, rating, overall_rating = row
            ticket = {
                "movie_id": movie_id,
                "movie_name": movie_name,
                "session_id": session_id,
                "rating": rating,
                "overall_rating": overall_rating
            }
            tickets_list.append(ticket)

        # Return the tickets list as a JSON response
        return jsonify(tickets_list)

    except mysql.connector.Error as error:
        return {"error": str(error)}

# Buy Ticket
import uuid # for random ticked id generation
@app.route("/audience-dashboard/buy-ticket", methods=["POST"])
def buy_ticket():
    try:
        # Get the user_name and session_id from the request body
        data = request.get_json()
        user_name = data.get('user_name')
        session_id = data.get('session_id')

        # Generate a random ticket_id
        ticket_id = str(uuid.uuid4())

        # Perform the necessary database operation to buy a ticket
        query = "INSERT INTO tickets (ticket_id, user_name, session_id) VALUES (%s, %s, %s)"
        args = (ticket_id, user_name, session_id)
        execute_query(query, args)

        # Return a success response
        return {"status": "success", "message": "Ticket bought successfully"}

    except mysql.connector.Error as error:
        return {"error": str(error)}

if __name__ == "__main__":
    app.run(debug=True)
