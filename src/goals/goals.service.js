const db = require('../db/connection');

function list() {
  return db.select().from('goals');
}

function read(id) {
  return db('goals').where({ id }).first();
}

function create(goal) {
  return db('goals').insert(goal).returning('*');
}

function update(id, updates) {
  return db('goals').where({ id }).update(updates).returning('*');
}

function destroy(id) {
  return db('goals').where({ id }).del();
}

function createGoalForUser(userId, goal) {
  return db.transaction(async trx => {
    const [newGoal] = await trx('goals')
      .insert(goal)
      .returning('*');

    await trx('users_goals').insert({
      user_id: userId,
      goal_id: newGoal.id
    });
  });
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
  createGoalForUser
}
