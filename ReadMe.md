# Web Mapping CA2

## Overview

The objective of this CA was to develop a full stack application that utalises mapping technologies. I have chosen to implement an early version of my final year project, Nitelight. It is a native mobile app that acts as a nightlife companiion.

The app has 4 main functions:
- Display up to date information on venues
- Facilitate secure user management
- Allow users to filter venues based on preferences (Distance etc.)
- Implement a review system for users to offer feedback on venues.

## Technologies Used

- **Database**: PostgreSQL with PostGIS
- **Middle Tier(s)**: Django with Django REST Framework
- **Front-end**: React Native
- **Mapping**: Leaflet JS with GoogleMaps
- **Deployment (middle tier(s))**: Docker, deployed on Amazon AWS

## Project Structure

### Backend (Django)

- **Models**: 
  - `Venue`: Represents a location with details such as name, location coordinates, address, description, opening hours, and venue type.
  - `Review`: Represents reviews for a venue, including the user, rating, and comments.

- **Views and Serializers**:
  - `VenueViewSet`: Handles CRUD operations for venues and retrieves venue details with associated reviews.
  - `ReviewViewSet`: Manages CRUD operations for reviews and requires authentication.

- **Authentication and Registration**:
  - `register` endpoint for user registration.
  - `login` endpoint for user login.

- **Additional Functionality**:
  - `submit_review` endpoint for submitting reviews, requires authentication.

### Frontend

- **API.js**: Facilitates communication between the front and back end systems.
- **React App**: Developed with early usability principals in mind, ensuring minimalistic design etc.

## Video Demonstration

https://youtu.be/iOkDgDu31NI
