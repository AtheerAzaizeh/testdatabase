const { check, validationResult } = require('express-validator');

exports.validateManager = [
  check('FullName').not().isEmpty().withMessage('Full name is required'),
  check('MobileNumber').isMobilePhone().withMessage('Invalid mobile number'),
  check('EmailAddress').isEmail().withMessage('Invalid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
