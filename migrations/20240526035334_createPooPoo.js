exports.up = function(knex) {
  return knex.schema.createTable('PooPoo', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('quantity').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('PooPoo');
};
