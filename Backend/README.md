# Vacations API

## Description
This API server requires user registration or login and exposes vacations. Users can add likes to vacations or remove likes. Additionally, an admin can add/update/delete vacations and שll these actions are checked by validation. All API actions are performed only when the client is logged in or registered.

## Installation
1. Run `npm i` to install the required libraries.
2. Install the following libraries:
    - "cors": "^2.8.5"
    - "dotenv": "^16.4.3"
    - "express": "^4.18.2"
    - "express-fileupload": "^1.4.3"
    - "express-rate-limit": "^7.1.5"
    - "joi": "^17.12.1"
    - "jsonwebtoken": "^9.0.2"
    - "mysql2": "^3.9.1"
    - "striptags": "^3.2.0"
    - "uploaded-file-saver": "^1.0.1"

## Usage
Run `npm start` to start the server.

## Endpoints
- POST http://localhost:4000/api/register --> Register a new user, returns a token
- POST http://localhost:4000/api/login --> Login an existing user, returns a token
- GET http://localhost:4000/api/vacations/:userId --> Return all vacations, sorted by vacation start date in ascending order
- GET http://localhost:4000/api/vacations/vacation/:vacationId --> Return one vacation
- POST http://localhost:4000/api/vacations --> Add a vacation and return it
- PUT http://localhost:4000/api/vacations/:vacationId --> Update a vacation and return it
- DELETE http://localhost:4000/api/vacations/:vacationId --> Delete a vacation and return a no-content status code
- GET http://localhost:4000/vacations/images/:imageName --> Return an image file
- POST http://localhost:4000/api/vacations/likes --> Add a like and return it
- DELETE http://localhost:4000/api/vacations/likes/:userId/:vacationId --> Delete a like and return a no-content status code

## Testing
Run `npm test` for all rest api urls testing.

