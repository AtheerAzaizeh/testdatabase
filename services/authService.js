const User = require('../models/user');
const Worker = require('../models/worker');
const Manager = require('../models/manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

class AuthService {
  static async register(data) {
    if (!validator.isEmail(data.Email)) {
      throw new Error('Invalid email format');
    }

    const existingUser = await User.findOne({ where: { Email: data.Email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = await User.create(data);

    if (data.UserType === 'Worker') {
      await Worker.create({ UserID: user.UserID });
    } else if (data.UserType === 'Manager') {
      await Manager.create({ UserID: user.UserID });
    }

    return user;
  }

  static async login(username, password) {
    const user = await User.findOne({ where: { Username: username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user.UserID, userType: user.UserType }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }

  static async getUserById(id) {
    return User.findByPk(id);
  }
}

module.exports = AuthService;
