const db = require('../db/connection');

function list() {
  return db.select().from('users');
}

function read(id) {
  return db('users').where({ id }).first();
}

function create(goal) {
  return db('users').insert(goal).returning('*');
}

function update(id, updates) {
  return db('users').where({ id }).update(updates).returning('*');
}

function destroy(id) {
  return db('users').where({ id }).del();
}

function listUsersWithGoals() {
  return db('users')
    .leftJoin('users_goals', 'users.id', 'users_goals.user_id')
    .leftJoin('goals', 'users_goals.goal_id', 'goals.id')
    .select('users.*', db.raw('json_agg(goals.*) as goals'))
    .groupBy('users.id');
}

// Json for User not included
// function listGoalsForUser(userId) {
//   return db('users_goals')
//     .where({ user_id: userId })
//     .join('goals', 'users_goals.goal_id', 'goals.id');
// }

function listGoalsForUser(userId) {
  return db('users')
    .leftJoin('users_goals', 'users.id', 'users_goals.user_id')
    .leftJoin('goals', 'users_goals.goal_id', 'goals.id')
    .where('users.id', userId)
    .select(
      'users.id as user_id',
      'users.first_name',
      'users.last_name',
      'users.username',
      'users.email',
      'users.points',
      db.raw('json_agg(goals.*) as goals')
    )
    .groupBy('users.id')
    .first();
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
  listUsersWithGoals,
  listGoalsForUser
}
