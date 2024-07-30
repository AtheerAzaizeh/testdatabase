const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Notification = sequelize.define('Notification', {
  NotificationID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  UserID: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'UserID' } },
  Message: { type: DataTypes.TEXT, allowNull: false },
  Read: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Notification.associate = models => {
  Notification.belongsTo(models.User, { foreignKey: 'UserID', as: 'user' });
};

module.exports = Notification;
