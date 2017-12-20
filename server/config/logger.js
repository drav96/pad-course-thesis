/**
 * Configurations of logger.
 */
const winston = require('winston');
require('winston-daily-rotate-file');

const transportFileException = new winston.transports.File({filename: 'logs/exceptions.log', json: false});
const transportConsole = new winston.transports.Console({
  handleExceptions: true, humanReadableUnhandledException: true, 'colorize': true,
  json: false
});

const logger = new (winston.Logger)({
  transports: [transportConsole],
  exceptionHandlers: [
    transportFileException
  ],
  exitOnError: false
});

logger.add(winston.transports.DailyRotateFile, {
  'name': 'access-file',
  'level': 'info',
  'filename': 'logs/access.log',
  'json': false,
  'datePattern': 'dd-MM-yyyy-',
  'prepend': true
});
//
logger.add(winston.transports.DailyRotateFile, {
  'name': 'error-file',
  'level': 'error',
  'filename': 'logs/error.log',
  'json': false,
  'datePattern': 'dd-MM-yyyy-',
  'prepend': true
});

module.exports = logger;
