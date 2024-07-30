const { Sequelize } = require('sequelize');
let instance = null;

class Database {
  constructor() {
    if (!instance) {
      instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
      });
    }
    return instance;
  }
}

module.exports = new Database();
