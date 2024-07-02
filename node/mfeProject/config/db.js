
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('OneByte', 'postgres', 'Manju@12345', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;