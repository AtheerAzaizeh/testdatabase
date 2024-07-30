const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Worker = sequelize.define('Worker', {
  WorkerID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  FirstName: { type: DataTypes.STRING, allowNull: false },
  LastName: { type: DataTypes.STRING, allowNull: false },
  DateOfBirth: { type: DataTypes.DATE, allowNull: false },
  Location: { type: DataTypes.STRING },
  PhoneNumber: { type: DataTypes.STRING },
  ProfilePicture: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Worker;
