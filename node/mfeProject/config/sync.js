const sequelize = require('../config/db');
const User = require('../models/User');
const Project = require('../models/Project');
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Run pending migrations
    await sequelize.sync();
    console.log('All pending migrations have been executed successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();