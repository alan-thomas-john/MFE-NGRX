const { DataTypes, Model } = require('sequelize');
const Project = require('./Project');
const sequelize = require('../config/db');

class User extends Model {
  // You can define class-level (static) methods here
  static async findOneByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  // You can define instance-level methods here
  async saveUser() {
    return await this.save();
  }
  async addProject(project){
    return await this.setProject(project);
  //  return this.save();
    }
  async  deleteProject(){
    return await this.setProject(null);
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
        model: Project, // This is the model to which we're referring
        key: 'id', // This is the column name in the Project model
      },
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});
User.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = User;