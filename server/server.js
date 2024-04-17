const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const shortid = require('shortid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const shortId = shortid.generate();

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO urls (short_id, long_url) VALUES ($1, $2) RETURNING short_id',
      [shortId, longUrl]
    );
    client.release();
    res.json({
      shortUrl: `${process.env.BASE_URL}/${result.rows[0].short_id}`,
    });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT long_url FROM urls WHERE short_id = $1',
      [shortId]
    );
    client.release();
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'URL not found' });
    } else {
      res.redirect(result.rows[0].long_url);
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
