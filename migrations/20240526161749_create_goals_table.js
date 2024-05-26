/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('goals', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()')); // Primary key using UUID
    table.enu('category', ['repeat', 'single', 'assignedSingle', 'assignedRepeat']).notNullable(); // ENUM for category
    table.string('title').notNullable(); // Title of the goal
    table.text('description'); // Description of the goal
    table.integer('points').notNullable(); // Points assigned to the goal
    table.date('startDate').notNullable(); // Start date of the goal
    table.date('endDate'); // End date of the goal
    table.boolean('complete').notNullable().defaultTo(false); // Completion status
    table.timestamps(true, true); // createdAt and updatedAt columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('goals'); // Drop the goals table if the migration is rolled back
};
