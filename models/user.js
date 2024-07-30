const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  UserID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Username: { type: DataTypes.STRING, allowNull: false, unique: true },
  Password: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  UserType: { type: DataTypes.ENUM('Manager', 'Worker'), allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.Password = await bcrypt.hash(user.Password, salt);
});

module.exports = User;
