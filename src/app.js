const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
dotenv.config();


const goalsRouter = require("./goals/goals.router");


app.use("/goals", goalsRouter);

const db = require('./db/connection');

app.post('/users', async (req, res) => {
  const { firstName, lastName, username, email, password, points } = req.body;

  try {
    await db.transaction(async trx => {
      const [user] = await trx('users').insert({ // I think I no longer need the transaction
        first_name: firstName,                     // because I am not inserting into the users_goals table
        last_name: lastName,
        username,
        email,
        password,
        points,
      }).returning('*');

      res.status(201).json(user);
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await db('users')
      .select('id', 'first_name', 'last_name', 'username', 'email', 'points');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await db('users')
      .select('id', 'first_name', 'last_name', 'username', 'email', 'points')
      .where({ id: userId })
      .first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const [updatedUser] = await db('users')
      .where({ id: userId })
      .update(updates)
      .returning('*');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a specific user by ID
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await db('users')
      .where({ id: userId })
      .del()
      .returning('*');

    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Assigns goals as a user is created
// app.post('/users/embed-goals', async (req, res) => {
//   const { firstName, lastName, username, email, password, points, goals } = req.body;

//   try {
//     await db.transaction(async trx => {
//       const [user] = await trx('users').insert({
//         first_name: firstName,
//         last_name: lastName,
//         username,
//         email,
//         password,
//         points,
//       }).returning('*');

//       if (goals && goals.length > 0) {
//         const userGoals = goals.map(goal => ({ user_id: user.id, goal_id: goal }));
//         await trx('users_goals').insert(userGoals);
//       }

//       res.status(201).json(user);
//     });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });


// Get Users with Goals Embeded
app.get('/users/goals', async (req, res) => {
  try {
    const usersWithGoals = await db('users')
      .leftJoin('users_goals', 'users.id', 'users_goals.user_id')
      .leftJoin('goals', 'users_goals.goal_id', 'goals.id')
      .select(
        'users.id as user_id',
        'users.first_name',
        'users.last_name',
        'users.username',
        'users.email',
        'users.points',
        db.raw('json_agg(json_build_object(\'goal_id\', goals.id, \'title\', goals.title, \'description\', goals.description, \'category\', goals.category, \'points\', goals.points, \'start_date\', goals.start_date, \'end_date\', goals.end_date, \'complete\', goals.complete)) as goals')
      )
      .groupBy('users.id');

    res.status(200).json(usersWithGoals);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});



module.exports = app;
