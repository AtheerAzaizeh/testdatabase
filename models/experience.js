const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Worker = require('./worker');

const Experience = sequelize.define('Experience', {
  ExperienceID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  WorkerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Worker, key: 'WorkerID' } },
  CompanyName: { type: DataTypes.STRING },
  JobTitle: { type: DataTypes.STRING },
  StartDate: { type: DataTypes.DATE },
  EndDate: { type: DataTypes.DATE },
  SkillsGained: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Experience.associate = models => {
  Experience.belongsTo(models.Worker, { foreignKey: 'WorkerID', as: 'worker' });
};

module.exports = Experience;
