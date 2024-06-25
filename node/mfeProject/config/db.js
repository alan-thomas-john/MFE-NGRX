
// require('dotenv').config();
// const mongoose = require('mongoose');
// const ATLAS_URI= process.env.ATLAS_URI


// mongoose.set('strictQuery',false);
// mongoose.connect(ATLAS_URI);
//    const connection = mongoose.connection;
// connection.once('open', () => {
//    console.log("MongoDB database connection established successfully");
// })

// module.exports = mongoose.connection;
const { Pool } = require('pg');

// Create a new pool instance with your database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'oneByte',
  password: 'fahim',
  port: 5432,
});

// Function to query the database
const query = (text, params) => {
  return pool.query(text, params);
};

// Export the query function and the pool instance if needed
module.exports = {
  query,
  pool
};