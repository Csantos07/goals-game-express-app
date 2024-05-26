const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const knexConfig = require('./knexfile');
const knex = require('knex');

// Load environment variables from .env file
dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
const db = knex(config);

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Define a route to retrieve all goals
app.get('/goals', async (req, res) => {
  try {
    // Retrieve all goals from the database
    const goals = await db.select().from('goals');
    res.json(goals);
  } catch (error) {
    console.error('Error retrieving goals:', error);
    res.status(500).json({ error: 'Failed to retrieve goals' });
  }
});

app.post('/goals', async (req, res) => {
  const { category, title, description, points, start_date, end_date, complete } = req.body;

  // Validate the input
  if (!category || !title || !description || !points) {
    return res.status(400).json({ error: 'Category, title, and points are required' });
  }

  try {
    // Insert new goal into the database
    const newGoal = await db('goals').insert({
      category,
      title,
      description,
      points,
      start_date,
      end_date,
      complete
    }).returning('*');

    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
