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

module.exports = {
  list,
  read,
  create,
  update,
  destroy
}
