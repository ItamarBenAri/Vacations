# Vacations Website

## Description
An internet site based on React utilizing the Single Page Application (SPA) technology that connects to the vacations REST API. The site requires registration or login to view vacations, allows adding a like to a vacation, or removing a like. Additionally, an admin can add/update/delete a vacation, view reports of likes for each vacation and download the report to their personal computer.

## Installation
1. Run `npm i` to install the required libraries.
2. Install the following libraries:
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.4",
    "@mui/joy": "^5.0.0-beta.31",
    "@mui/material": "^5.15.4",
    "@mui/x-charts": "^7.1.1",
    "@mui/x-date-pickers": "^7.1.0",
    "@reduxjs/toolkit": "^2.0.1",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/react": "^18.2.46",
    "@types/react-csv": "^1.1.10",
    "@types/react-dom": "^18.2.18",
    "@types/react-redux": "^7.1.33",
    "@types/react-router-dom": "^5.3.3",
    "@types/yup": "^0.32.0",
    "axios": "^1.6.5",
    "dayjs": "^1.11.10",
    "jwt-decode": "^4.0.0",
    "notyf": "^3.10.0",
    "react": "^18.2.0",
    "react-csv": "^2.2.2",
    "react-dom": "^18.2.0",
    "react-google-charts": "^4.0.1",
    "react-hook-form": "^7.51.1",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.21.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"

## Running Instructions
Run `npm start` to start the server.

## Website Overview
The website design is largely based on the MUI library.

- `/login` - Available to all users. Allows users to log in, and the login form is validated before sending it to the server.
- `/register` - Available to all users. Allows users to register, and the registration form is validated before sending it to the server.
- `/home` - Available only to logged-in users. Displays all vacations, allows adding/removing likes, filtering to show only favorite/future/active vacations, and displays 9 vacations per page with pagination for more.
- `/new` - Available only to admin users. Allows adding a vacation, and the add vacation form is validated before sending it to the server.
- `/edit/:vacationId` - Available only to admin users. Allows updating a vacation, and the update vacation form is validated before sending it to the server.
- `/reports/vacations` - Available only to admin users. Allows viewing reports of likes for vacations and downloading them to the personal computer.
- `/pageNotFound` - Available to all users. Appears when the route does not exist, i.e., 404 error.
