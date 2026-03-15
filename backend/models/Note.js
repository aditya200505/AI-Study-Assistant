const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Subject = require('./Subject');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
  }
}, { timestamps: true });

Note.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });

Note.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
Subject.hasMany(Note, { foreignKey: 'subjectId', as: 'notes' });

module.exports = Note;
