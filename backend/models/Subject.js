const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Subject = sequelize.define('Subject', {
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#3B82F6'
  }
}, { timestamps: true });

Subject.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Subject, { foreignKey: 'userId', as: 'subjects' });

module.exports = Subject;
