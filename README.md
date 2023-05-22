### MovieDB-App for CMPE321: Database Systems

Welcome to the MovieDB-App for CMPE321: Database Systems repository! This is a simple web application that utilizes Flask, Python, MySQL, and React. The application provides a user interface (UI) for different types of users, including Managers, Directors, and the Audience, allowing them to interact with the system.

The primary goal of this project is to create a and simple web application that connects to a MySQL database. With this application, users have the ability to perform various actions based on their assigned roles. 

### Prerequisites

Before getting started, make sure you have the following dependencies installed:

- Python (version 3.11.X)
- Node.js (version 8.19.X)
- MySQL (version 8.0.X)

### Installation

Follow these steps to set up the project:

1. Clone the repository.

2. Navigate to the `app` folder.

#### Client (React)

1. Install Node.js and npm if not already installed:
- If Node.js and npm are not installed, follow the official instructions for your operating system:
  - [Installing Node.js and npm](https://nodejs.org/en/download/)
2. Navigate to the `client` directory.
3. Install the required dependencies included in package.json:
  ```
  npm install
  ```

#### Database (MySQL)

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

#### Flask Server (Python)

1. Navigate to the `flask-server` directory.
2. Set up a virtual environment if you wish (recommended):
  ```
  python -m venv venv
  ```
2.1. Activate the virtual environment:
  - For Windows:
  ```
  venv\Scripts\activate
  ```
  - For macOS/Linux:
  ```
  source venv/bin/activate
  ```
3. Install the required Python packages:
pip install -r requirements.txt



