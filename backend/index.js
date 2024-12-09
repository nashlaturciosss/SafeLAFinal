/* eslint-disable no-undef */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();


const user = process.env.POSTGRES_USER;
const database = process.env.POSTGRES_DB;
const password = process.env.POSTGRES_PASSWORD;
console.log(password)





dotenv.config();

const app = express();
const port = process.env.VITE_PORT|| 3000;

// PostgreSQL Connection
const pool = new Pool({
  user: user,
  host: 'localhost', // Use 'db' if connecting via Docker Compose network
  database: database,
  password: password,
  port: 5433, // Matches the exposed port in docker-compose
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch all crime locations
app.get('/api/crime-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT latitude, longitude, crime_type, report_time FROM locations;');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching crime data:', error);
    res.status(500).json({ error: 'Failed to fetch crime data' });
  }
});


// Endpoint to add a new crime report
app.post('/api/report-crime', async (req, res) => {
  const { latitude, longitude, report_time, crime_type, user_id } = req.body;

  // Validate required fields
  if (!latitude || !longitude || !report_time || !crime_type || !user_id) {
    return res.status(400).json({
      error: 'Latitude, longitude, report time, crime type, and user ID are required',
    });
  }

  try {
    const query = `
      INSERT INTO locations (latitude, longitude, report_time, crime_type, user_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [latitude, longitude, report_time, crime_type, user_id];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding crime report:', error);
    res.status(500).json({ error: 'Failed to add crime report' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

