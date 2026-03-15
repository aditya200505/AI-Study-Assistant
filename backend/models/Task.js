const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Subject = require('./Subject');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, { timestamps: true });

Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

Task.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
Subject.hasMany(Task, { foreignKey: 'subjectId', as: 'tasks' });

module.exports = Task;
