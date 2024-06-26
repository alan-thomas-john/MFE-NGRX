

// const { Pool } = require('pg');

// // Create a new pool instance with your database configuration
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'oneByte',
//   password: 'fahim',
//   port: 5432,
// });

// // Function to query the database
// const query = (text, params) => {
//   return pool.query(text, params);
// };

// // Export the query function and the pool instance if needed
// module.exports = {
//   query,
//   pool
// };
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('oneByte', 'postgres', 'fahim', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;