
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('OneByte', 'postgres', 'alan@123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;