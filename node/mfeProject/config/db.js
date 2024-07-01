
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('oneByte', 'postgres', 'fahim', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;