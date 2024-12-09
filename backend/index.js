/* eslint-disable no-undef */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost', // Change to 'db' if using Docker
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // Match your database port
});

app.use(cors());
app.use(express.json());

app.get('/api/crime-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT latitude, longitude, crime_type, report_time, user_id FROM locations;');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching crime data:', error);
    res.status(500).json({ error: 'Failed to fetch crime data' });
  }
});

app.post('/api/report-crime', async (req, res) => {
  const { latitude, longitude, report_time, crime_type, user_id } = req.body;
  if (!latitude || !longitude || !report_time || !crime_type || !user_id) {
    return res.status(400).json({ error: 'All fields are required' });
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
