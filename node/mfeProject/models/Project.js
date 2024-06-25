const User = require('./User');
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Project extends Model {
  // You can define class-level (static) methods here
}

Project.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  front_end: {
    type: DataTypes.TEXT,
  },
  back_end: {
    type: DataTypes.TEXT,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects', // Ensure this matches your actual table name
  timestamps: true,
});

module.exports = Project;