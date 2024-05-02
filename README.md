## Project Overview

This project consists of both frontend and backend components that work together to create a vacations management system.

### Frontend

#### Vacations Website

The frontend of the project is built using React, employing the Single Page Application (SPA) architecture. It connects to the backend REST API to fetch and manipulate data related to vacations. The website allows users to register or login to access functionalities such as viewing vacations, adding likes to vacations, or removing likes. Admin users have additional privileges, including adding, updating, or deleting vacations, as well as generating and downloading reports on vacation likes.

### Backend

#### Vacations API

The backend of the project serves as a RESTful API that manages vacations data. It requires user authentication (registration or login) to access its endpoints securely. Users can interact with the API to perform actions such as fetching all vacations, fetching a specific vacation, adding, updating, or deleting vacations, adding or removing likes to vacations, and accessing vacation images. All API actions are validated to ensure data integrity and security.

## Installation

To set up the project, follow these instructions:

### Frontend Installation

1. Navigate to the frontend directory.
2. Run `npm i` to install the required libraries listed in the `package.json` file.

### Backend Installation

1. Navigate to the backend directory.
2. Run `npm i` to install the required libraries listed in the `package.json` file.

## Running Instructions

To run the project, follow these instructions:

### Frontend

1. Navigate to the frontend directory.
2. Run `npm start` to start the frontend server.

### Backend

1. Navigate to the backend directory.
2. Run `npm start` to start the backend server.

## Usage

Once both the frontend and backend servers are running, you can access the website through your browser. The frontend communicates with the backend API to perform various actions related to vacations management.

## Endpoints

The backend API exposes the following endpoints:

- `POST /api/register`: Register a new user and receive a token.
- `POST /api/login`: Log in an existing user and receive a token.
- `GET /api/vacations/:userId`: Fetch all vacations sorted by start date.
- `GET /api/vacations/vacation/:vacationId`: Fetch a specific vacation.
- `POST /api/vacations`: Add a new vacation.
- `PUT /api/vacations/:vacationId`: Update a vacation.
- `DELETE /api/vacations/:vacationId`: Delete a vacation.
- `GET /vacations/images/:imageName`: Fetch an image file associated with a vacation.
- `POST /api/vacations/likes`: Add a like to a vacation.
- `DELETE /api/vacations/likes/:userId/:vacationId`: Remove a like from a vacation.

## Testing

To run tests for the REST API endpoints, execute `npm test` in the backend directory. This ensures that the API functions correctly and handles requests appropriately.

## Author

This Vacations application was created by Itamar Ben Ari.
