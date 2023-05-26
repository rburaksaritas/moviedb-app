import mysql.connector

def handle_login(user_name, password, role, connection):
    # Connect to your MySQL database using mysql.connector
    # Perform the necessary login logic, such as querying the database
    # and checking if the provided user_name, manager_password, and role are valid

    # Establish a connection to the MySQL database
    connection = mysql.connector.connect(**connection)

    # Create a cursor to execute queries
    cursor = connection.cursor()

    # Perform the login query based on the role
    if role == 'manager':
        query = "SELECT * FROM database_managers WHERE user_name = %s AND manager_password = %s"
    elif role == 'director':
        query = "SELECT * FROM directors_agreements WHERE user_name = %s AND director_password = %s"
    elif role == 'audience':
        query = "SELECT * FROM audience WHERE user_name = %s AND audience_password = %s"
    else:
        return {'status': 'error', 'message': 'Invalid role selected'}

    # Execute the query with the provided user_name and password
    cursor.execute(query, (user_name, password))

    # Fetch the result of the query
    result = cursor.fetchone()

    if result is not None:
        # Login successful
        return {'status': 'success', 'message': f'{role.capitalize()} login successful'}
    else:
        # Invalid user_name or password
        return {'status': 'error', 'message': 'Invalid user_name or password'}

    # Close the cursor and release the connection
    cursor.close()
    connection.close()
