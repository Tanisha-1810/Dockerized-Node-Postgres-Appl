
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Connected to PostgreSQL! Server time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Error connecting to database: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

