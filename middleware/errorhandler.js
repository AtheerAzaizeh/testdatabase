const logger = require('../config/logger');

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const errorCode = statusCode === 500 ? 'ERR500' : 'ERR400';
  
  logger.error({
    message: err.message,
    code: errorCode,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });
  
  res.json({
    errorCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

module.exports = errorHandler;
