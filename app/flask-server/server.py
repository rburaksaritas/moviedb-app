from flask import Flask, request, redirect, render_template, jsonify
import mysql.connector
from login import handle_login

app = Flask(__name__)

# MySQL connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'moviedb'
}

# Create a MySQL connection pool
cnxpool = mysql.connector.pooling.MySQLConnectionPool(pool_name="my_pool", pool_size=5, **db_config)

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


# Test route
@app.route("/test", methods=["GET"])
def getmanagers():
    try:
        # Acquire a connection from the pool
        cnx = cnxpool.get_connection()
        # Create a cursor to execute queries
        cursor = cnx.cursor()
        # Execute the query
        query = "SELECT * FROM database_managers"
        cursor.execute(query)
        # Fetch all the rows
        managers = cursor.fetchall()
        # Close the cursor and release the connection back to the pool
        cursor.close()
        cnx.close()
        # Return the response
        return {"managers": managers}

    except mysql.connector.Error as error:
        return {"error": str(error)}

if __name__ == "__main__":
    app.run(debug=True)