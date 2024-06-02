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

// Get a single goal by ID
app.get('/goals/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the goal with the specified ID from the database
    const goal = await db('goals').where({ id }).first();

    // Check if the goal exists
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    console.error('Error retrieving goal:', error);
    res.status(500).json({ error: 'Failed to retrieve goal' });
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

// Update a goal by ID
app.put('/goals/:id', async (req, res) => {
  const { id } = req.params;
  const { category, title, description, points, start_date, end_date, complete } = req.body;

  // // Validate the input
  // if (!category || !title || !description || !points) {
  //   return res.status(400).json({ error: 'Category, title, and points are required' });
  // }

  try {
    // Update the goal with the specified ID in the database
    const updatedGoal = await db('goals')
      .where({ id })
      .update({ category, title, description, points, start_date, end_date, complete })
      .returning('*');

    // Check if the goal was updated successfully
    if (!updatedGoal.length) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(updatedGoal[0]);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

// Delete a goal by ID
app.delete('/goals/:id', async (req, res) => {
  const { id } = req.params;

  console.log('id:', id);

  try {
    // Delete the goal with the specified ID from the database
    const deletedCount = await db('goals').where({ id }).del();

    // Check if a goal was deleted
    if (!deletedCount) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(204).end(); // No content to send in the response
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ error: 'Failed to delete goal' });
  }
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
