# MovieDB App for CMPE321: Database Systems

Welcome to the MovieDB-App for CMPE321: Database Systems repository! This is a simple web application that utilizes Flask, Python, MySQL, and React. The application provides a user interface (UI) for different types of users, including Managers, Directors, and the Audience, allowing them to interact with the system.

The primary goal of this project is to create a and simple web application that connects to a MySQL database. With this application, users have the ability to perform various actions based on their assigned roles.

## Features

The MovieDB-App provides the following features:
- Role-based access control.
- Managers can manage movies, directors, and ratings.
- Directors can manage movies they directed.
- The Audience can view movie listings, buy tickets, and rate movies.
- Overall rating calculation for movies. 

## Project Structure

The project follows a specific structure to organize the codebase:
- app/: Main directory of the app.
  - client/: Contains the React client-side code.
  - flask-server/: Contains the Flask server-side code.
  - database/: Contains MySQL scripts and database-related files.

## Prerequisites

Before getting started, make sure you have the following dependencies installed:

- Python (version 3.X.X)
- Node.js (version 8.19.X)
- MySQL (version 8.0.X)

## Installation

Follow these steps to set up the project:

1. Clone the repository.

2. Navigate to the `app` folder.

### Client (React)

1. Install Node.js and npm if not already installed:
- If Node.js and npm are not installed, follow the official instructions for your operating system:
  - [Installing Node.js and npm](https://nodejs.org/en/download/)
2. Navigate to the `client` directory.
3. Install the required dependencies included in package.json:
  ```
  npm install
  ```

### Database (MySQL)

1. Install MySQL if not already installed:
 - For Windows: Download the MySQL installer from the official website (https://dev.mysql.com/downloads/installer/) and run the installer. Follow the installation wizard to set up MySQL on your system.
 - For macOS: You can install MySQL using Homebrew by running the following command in the terminal:
   ```
   brew install mysql
   ```
 - For Linux: Use your distribution's package manager to install MySQL. For example, on Ubuntu, you can run the following command:
   ```
   sudo apt-get install mysql-server
   ```

### Flask Server (Python)

1. Navigate to the `flask-server` directory.
2. Set up a virtual environment if you wish (recommended):
  ```
  python -m venv venv
  ```
  - 2.1. Activate the virtual environment:
    - For Windows:
      ```
      venv\Scripts\activate
      ```
    - For macOS/Linux:
      ```
      source venv/bin/activate
      ```
3. Install the required Python packages:
  ```
  pip install -r requirements.txt
  ```

## Usage

To start the development servers, follow these steps:

1. Start the database:
- Navigate to the `database` directory:
- Start MySQL CLI:
  ``` 
  mysql
  ````
- Run the scripts to set up the database:
  ```
  source database.sql;
  source insertdata.sql;
  ```
- You can drop the tables if required:
  ```
  source droptables.sql;
  ```
  
2. In a seperate terminal where you installed the requirements from requirements.txt, Start the Flask development server:
- Navigate to the `flask-server` directory.
- Open `db_config.py` in a text editor of your choice.
- Modify the user and password in `db_config()` based on your configuration, save and close the editor.
  ```
  # MySQL connection configuration
  db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'moviedb'
  }
  ```
- Run the Flask server:
  ```
  python server.py
  ```
  
3. In a seperate terminal where you installed the requirements from package.json using npm, Start the React development server:
- Navigate to the `client` directory:
- Run the development server:
  ```
  npm start
  ```

The React development server will be accessible at `http://localhost:3000`, and the Flask development server will be accessible at `http://127.0.0.1:5000`.

