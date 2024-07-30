const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Manager = require('./manager');
const Worker = require('./worker');
const Job = require('./job');

const InterviewRequest = sequelize.define('InterviewRequest', {
  RequestID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ManagerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Manager, key: 'ManagerID' } },
  WorkerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Worker, key: 'WorkerID' } },
  JobID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Job, key: 'JobID' } },
  RequestDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  Status: { type: DataTypes.STRING, defaultValue: 'Pending' },
  Message: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

InterviewRequest.associate = models => {
  InterviewRequest.belongsTo(models.Manager, { foreignKey: 'ManagerID', as: 'manager' });
  InterviewRequest.belongsTo(models.Worker, { foreignKey: 'WorkerID', as: 'worker' });
  InterviewRequest.belongsTo(models.Job, { foreignKey: 'JobID', as: 'job' });
};

module.exports = InterviewRequest;
