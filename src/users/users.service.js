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

module.exports = {
  list,
  read,
  create,
  update,
  destroy
}
