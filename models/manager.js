const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Manager = sequelize.define('Manager', {
  ManagerID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  FullName: { type: DataTypes.STRING, allowNull: false },
  MobileNumber: { type: DataTypes.STRING, allowNull: false },
  EmailAddress: { type: DataTypes.STRING, allowNull: false },
  AgencyName: { type: DataTypes.STRING },
  Location: { type: DataTypes.STRING },
  Education: { type: DataTypes.STRING },
  WorkTime: { type: DataTypes.STRING },
  TypeOfWork: { type: DataTypes.STRING },
  YearsOfExperience: { type: DataTypes.INTEGER },
  SearchPreferences: { type: DataTypes.TEXT }
});

module.exports = Manager;
