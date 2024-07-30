const { check, validationResult } = require('express-validator');

exports.validateWorker = [
  check('FirstName').not().isEmpty().withMessage('First name is required'),
  check('LastName').not().isEmpty().withMessage('Last name is required'),
  check('DateOfBirth').isDate().withMessage('Invalid date of birth'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
