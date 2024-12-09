DESIGN.md

Overview

SafeLA uses React, Node.js, Docker, and PostgreSQL.

Architecture

1. Frontend: A React-based single-page application (SPA) for user interaction.
2. Backend: Node.js-based API endpoints for handling data submission and retrieval.
3. Database* PostgreSQL as the relational database for structured data storage.
4. Containerization: Docker allows for consistent environments across development, testing, and deployment.

Frontend Design

- React: Chosen for its component-based architecture, which simplifies development and promotes reusability.
- Material-UI (MUI): Used for a responsive and modern UI.
- Vis.gl with Google Maps API: Enables interactive maps to pinpoint crime locations.

Components
1. Home Page (Home.jsx):
   - Displays a crime map using Google Maps.
   - Interactive pins allow users to explore reported crimes visually.

2. Report Page (Report.jsx):
   - Users can input details (latitude, longitude, crime type).
   - Google Maps integration enables location selection by clicking on the map.
   - Data is sent to the backend via a POST request for storage.

3. About Us Page (AboutUs.jsx):
   - Describes the mission and purpose of SafeLA.

4. Resources Page (Resources.jsx):
   - Provides safety tips, crisis hotline numbers, and neighborhood watch information.

Routing
React Router is used to manage navigation between pages, enabling a seamless SPA experience.

Backend Design:

Technology Stack
- Node.js: Handles API endpoints for secure and efficient data handling.
- Express.js: Simplifies routing and middleware integration.

Database Design

Schema
One table, “locations”, would store crime data in this database :
- “location_id”: Primary key.
- “latitude” and “longitude”: Coordinates of the crime.
- “address”: Optional address field.
- “report_time”: Timestamp of the report (default: current time).
- “crime_type”: Type of crime.
- “user_id”: Identifier for the user who reported the crime.

Initialization
An “init.sql” file initializes the database schema and preloads it with mock crime data for testing purposes.

Containerization with Docker:

Docker Setup
1. PostgreSQL Container:
   - Defined in “docker-compose.yml”.
   - Preloaded with the “init.sql” file to set up the schema and seed data.
   - Uses “CS50Final_data” volume for persistent data storage.
2. Dockerfile:
   - Database container configuration simplified through environment variables for user, password, and database name.

 
Why we chose this design
1. React and Material-UI:
   - React's modularity and MUI's robust component library enhance developer productivity and user experience.

2. PostgreSQL:
- Selected due to its scalability and strong support for geospatial data.

3. Google Maps API:
   - Offers users a familiar interface to select and view crime locations.

4. Docker:
   - Ensures consistency of environment, reducing "it works on my machine" problems.

5. Data-Driven Design:
   - Mock data seeded in the database enables testing and iteration during development.

