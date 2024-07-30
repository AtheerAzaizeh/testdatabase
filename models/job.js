const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  JobID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ManagerID: { type: DataTypes.INTEGER, allowNull: false },
  JobTitle: { type: DataTypes.STRING, allowNull: false },
  JobDescription: { type: DataTypes.TEXT },
  JobType: { type: DataTypes.STRING },
  Location: { type: DataTypes.STRING },
  RequiredSkills: { type: DataTypes.TEXT },
  RequiredExperience: { type: DataTypes.INTEGER },
  EducationLevel: { type: DataTypes.STRING },
  PostedDate: { type: DataTypes.DATE },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Job;
