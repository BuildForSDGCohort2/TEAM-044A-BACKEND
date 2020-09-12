"use strict";

const winston = require('winston');

const expressWinston = require('express-winston');

const {
  createLogger
} = winston;
const level = process.env.NODE_ENV !== 'production' ? 'verbose' : 'info';
const filename = process.env.NODE_ENV !== 'production' ? 'dev-error.log' : 'error.log';

const getTransports = () => {
  const transports = [new winston.transports.Console({
    colorize: true
  }), new winston.transports.File({
    filename,
    level
  })];
  return transports;
};

const requestLogger = expressWinston.logger({
  level: 'info',
  transports: getTransports(),
  colorize: false,
  expressFormat: true,
  meta: true
});
const errorLogger = expressWinston.errorLogger({
  level: 'error',
  transports: getTransports()
});
const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'verbose' : 'info',
  transports: getTransports()
});
module.exports = {
  requestLogger,
  errorLogger,
  error: logger.error,
  warn: logger.warn,
  info: logger.info,
  log: logger.log,
  verbose: logger.verbose,
  debug: logger.debug,
  silly: logger.silly
};