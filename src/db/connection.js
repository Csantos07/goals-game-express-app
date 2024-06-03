// Load environment variables from .env file
// const dotenv = require('dotenv');
// dotenv.config();
// SHOULD THE ABOVE NOT BE PRESENT?

const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;

