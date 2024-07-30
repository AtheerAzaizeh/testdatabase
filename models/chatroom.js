const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const ChatRoom = sequelize.define('ChatRoom', {
  ChatRoomID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ManagerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'UserID' } },
  WorkerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'UserID' } },
  CreatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

ChatRoom.associate = models => {
  ChatRoom.belongsTo(models.User, { foreignKey: 'ManagerID', as: 'manager' });
  ChatRoom.belongsTo(models.User, { foreignKey: 'WorkerID', as: 'worker' });
};

module.exports = ChatRoom;
