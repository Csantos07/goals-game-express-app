const usersService = require('./users.service');
const goalsService = require('../goals/goals.service');

async function list(req, res) {
  try {
    // Retrieve all users from the database
    // const users = await usersService.list();
    const users = await usersService.list();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

async function read(req, res) {
  const { id } = req.params;

  try {
    const user = await usersService.read(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

async function create(req, res) {
  const { firstName, lastName, username, email, password, points } = req.body;

  try {
    const [user] = await usersService.create({
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      points
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

async function update(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const [user] = await usersService.update(id, updates);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function destroy(req, res) {
  const { id } = req.params;

  try {
    const user = await usersService.destroy(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

async function createGoalForUser(req, res) {
  const { id } = req.params;
  const { title, description, category, points, start_date, end_date, complete } = req.body;

  try {
    await goalsService.createGoalForUser(id, {
      title,
      description,
      category,
      points,
      start_date,
      end_date,
      complete
    });

    res.status(201).json({ message: 'Goal created for user' });
  } catch (error) {
    console.error('Error creating goal for user:', error);
    res.status(500).json({ error: 'Failed to create goal for user' });
  }
}

async function listUsersWithGoals(req, res) {
  try {
    const users = await usersService.listUsersWithGoals();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users with goals:', error);
    res.status(500).json({ error: 'Failed to retrieve users with goals' });
  }
}

async function listGoalsForUser(req, res) {
  const { id } = req.params;

  try {
    const goals = await usersService.listGoalsForUser(id);

    if (!goals) {
      return res.status(404).json({ error: 'Goals not found' });
    }

    res.status(200).json(goals);
  } catch (error) {
    console.error('Error retrieving goals for user:', error);
    res.status(500).json({ error: 'Failed to retrieve goals for user' });
  }
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
  createGoalForUser,
  listUsersWithGoals,
  listGoalsForUser
};
