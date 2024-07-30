const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const errorFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${message} ${stack ? '\n' + stack : ''}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    errorFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
});

module.exports = logger;
