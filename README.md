# Credence Backend Assignment

This is a basic backend server built with Node.js and Express. It handles user registration, login, register, get items, get all items, post new item, delete item

## Getting Started

1. Clone this repository.
2. Install dependencies: `npm install`
3. Create a `.env` file in the project root directory and define the following variables:
    * DB (MongoDB connection string)
    * PORT (server port number) 
4. Run the server: `node server.js`

## API Endpoints

* **POST /register**: Registers a new user.
* **POST /login**: Logins a user and returns a JWT token.
* **GET /users**: Retrieves a list of users (limited data for unauthorized users).
* **GET /items**: Retrieves a list of items (limited data for unauthorized users).
* **POST /items**: creating new item (limited data for unauthorized users).
* **GET /items/:id**: Retrieves a item with specific id (limited data for unauthorized users).
* **DELETE /items/:id**: Deleting specific item (limited data for unauthorized users).
* **PUT /items/:id**: Updating specific item details (limited data for unauthorized users).

**Note:** To access the items and users endpoint, authorization is required

## Deployment

* **Render Deployment**:https://credence-backend-assignment.onrender.com/
