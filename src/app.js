const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
dotenv.config();


const goalsRouter = require("./goals/goals.router");
const usersRouter = require("./users/users.router");


app.use("/goals", goalsRouter);
app.use("/users", usersRouter);

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
// app.get('/users/goals', async (req, res) => {
//   try {
//     const usersWithGoals = await db('users')
//       .leftJoin('users_goals', 'users.id', 'users_goals.user_id')
//       .leftJoin('goals', 'users_goals.goal_id', 'goals.id')
//       .select(
//         'users.id as user_id',
//         'users.first_name',
//         'users.last_name',
//         'users.username',
//         'users.email',
//         'users.points',
//         db.raw('json_agg(json_build_object(\'goal_id\', goals.id, \'title\', goals.title, \'description\', goals.description, \'category\', goals.category, \'points\', goals.points, \'start_date\', goals.start_date, \'end_date\', goals.end_date, \'complete\', goals.complete)) as goals')
//       )
//       .groupBy('users.id');

//     res.status(200).json(usersWithGoals);
//   } catch (error) {
//     console.error('Error retrieving users:', error);
//     res.status(500).json({ error: 'Failed to retrieve users' });
//   }
// });



module.exports = app;
