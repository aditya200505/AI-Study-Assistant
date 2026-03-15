const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const StudySession = sequelize.define('StudySession', {
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Duration in minutes'
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { timestamps: true });

StudySession.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(StudySession, { foreignKey: 'userId', as: 'studySessions' });

module.exports = StudySession;
