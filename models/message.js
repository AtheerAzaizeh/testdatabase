const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ChatRoom = require('./chatroom');

const Message = sequelize.define('Message', {
  MessageID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ChatRoomID: { type: DataTypes.INTEGER, allowNull: false, references: { model: ChatRoom, key: 'ChatRoomID' } },
  SenderID: { type: DataTypes.INTEGER, allowNull: false },
  MessageText: { type: DataTypes.TEXT, allowNull: false },
  SentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Message.associate = models => {
  Message.belongsTo(models.ChatRoom, { foreignKey: 'ChatRoomID', as: 'chatRoom' });
};

module.exports = Message;
