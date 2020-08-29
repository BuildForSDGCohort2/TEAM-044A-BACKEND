"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidPassword = exports.isValidAmount = exports.isValidEmail = exports.setCronJob = exports.upperFirst = exports.makeSource = void 0;

var _ipRegex = _interopRequireDefault(require("ip-regex"));

var _cron = _interopRequireDefault(require("cron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const {
  CronJob
} = _cron.default; // To get the ip address of the buyer

const buildMakeSource = ({
  isValidIp
}) => {
  return function makeSource({
    ip,
    browser,
    referrer
  } = {}) {
    if (!isValidIp(ip)) {
      throw new Error('Source must have a valid ip.');
    }

    if (!ip) {
      throw new Error('Source must have an ip.');
    }

    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer
    });
  };
};

const isValidIp = ip => {
  return (0, _ipRegex.default)({
    exact: true
  }).test(ip);
}; // Final export of the makeSource function.


const makeSource = buildMakeSource({
  isValidIp
});
/**
 * Utitlity functions,
 * To capitalize the first letter
 */

exports.makeSource = makeSource;

const upperFirst = word => {
  if (word.length === 1) {
    return word;
  }

  return word[0].toUpperCase() + word.substring(1);
};
/**
 * Email and Password Validation
 * Using RegExp
 */


exports.upperFirst = upperFirst;

const isValidEmail = email => {
  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  return valid.test(email);
};

exports.isValidEmail = isValidEmail;

const isValidPassword = password => {
  const validate = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/);
  return validate.test(password);
};

exports.isValidPassword = isValidPassword;

const isValidAmount = amount => {
  const valid = new RegExp(/^[0-9]+$/);
  return valid.test(amount);
};
/**
 *  CRON-JOB FOR SENDING MONEY FROM ESCROW TO SELLER ACCOUNT
 *
 */


exports.isValidAmount = isValidAmount;

const setCronJob = func => {
  const job = new CronJob('* * * * * *', func);
  job.start();
};

exports.setCronJob = setCronJob;