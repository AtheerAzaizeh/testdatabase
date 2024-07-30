const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Worker = require('./worker');

const Resume = sequelize.define('Resume', {
  ResumeID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  WorkerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Worker, key: 'WorkerID' } },
  Skills: { type: DataTypes.TEXT },
  Rating: { type: DataTypes.INTEGER },
  ResumePDF: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Resume.associate = models => {
  Resume.belongsTo(models.Worker, { foreignKey: 'WorkerID', as: 'worker' });
};

module.exports = Resume;
