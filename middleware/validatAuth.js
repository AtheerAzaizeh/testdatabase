const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('Username').not().isEmpty().withMessage('Username is required'),
  check('Email').isEmail().withMessage('Invalid email address'),
  check('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('UserType').isIn(['Manager', 'Worker']).withMessage('User type must be either Manager or Worker'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  check('Username').not().isEmpty().withMessage('Username is required'),
  check('Password').not().isEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
