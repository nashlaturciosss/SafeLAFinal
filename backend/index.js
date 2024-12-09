/* eslint-disable no-undef */

// Importing necessary dependencies
import express from 'express';  // Express.js for creating the server
import cors from 'cors';        // CORS middleware for cross-origin requests
import dotenv from 'dotenv';    // dotenv to load environment variables

// Importing PostgreSQL package
import pkg from 'pg';
const { Pool } = pkg;         // Pool class is used to manage database connections

// Load environment variables from .env file
dotenv.config();

// Extracting PostgreSQL connection details from environment variables
const user = process.env.POSTGRES_USER;     // Database username
const database = process.env.POSTGRES_DB;  // Database name
const password = process.env.POSTGRES_PASSWORD;  // Database password
console.log(password); // Logging password for debugging purposes (usually avoid in production)

// Initialize dotenv configuration to load environment variables
dotenv.config();

// Setting up the Express application
const app = express();
const port = process.env.VITE_PORT || 3000;  // Using environment variable for port, fallback to 3000 if not provided

// PostgreSQL Connection setup using Pool (connection pooling is more efficient for handling multiple requests)
const pool = new Pool({
  user: user,            // PostgreSQL username
  host: 'localhost',     // Host is 'localhost' for local development (use 'db' in Docker Compose network)
  database: database,    // Database name
  password: password,    // Database password
  port: 5433,            // Port number, match the exposed port in docker-compose if using Docker
});

// Middleware setup
app.use(cors());           // Enabling Cross-Origin Resource Sharing to allow frontend to make requests to backend
app.use(express.json());   // Middleware to parse incoming JSON payloads in requests

// Endpoint to fetch all crime locations from the database
app.get('/api/crime-data', async (req, res) => {
  try {
    // Query to get crime data from PostgreSQL database
    const result = await pool.query('SELECT latitude, longitude, crime_type, report_time FROM locations;');
    res.status(200).json(result.rows);  // Send the result as JSON
  } catch (error) {
    console.error('Error fetching crime data:', error);  // Log error if something goes wrong
    res.status(500).json({ error: 'Failed to fetch crime data' });  // Send a server error response
  }
});

// Endpoint to add a new crime report
app.post('/api/report-crime', async (req, res) => {
  // Destructure data from the request body
  const { latitude, longitude, report_time, crime_type, user_id } = req.body;

  // Validate required fields
  if (!latitude || !longitude || !report_time || !crime_type || !user_id) {
    return res.status(400).json({
      error: 'Latitude, longitude, report time, crime type, and user ID are required',  // Return error if fields are missing
    });
  }

  try {
    // SQL query to insert a new crime report into the database
    const query = `
      INSERT INTO locations (latitude, longitude, report_time, crime_type, user_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    // Values to be inserted
    const values = [latitude, longitude, report_time, crime_type, user_id];

    // Execute the query and get the result
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);  // Respond with the inserted crime report data
  } catch (error) {
    console.error('Error adding crime report:', error);  // Log any error that occurs
    res.status(500).json({ error: 'Failed to add crime report' });  // Return an error if something goes wrong
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);  // Log a message once the server is running
});
