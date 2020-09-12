"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMakeUserFactory = ({
  upperFirst,
  isValidEmail,
  isValidPassword,
  makeSource
}) => {
  return function makeUser({
    firstName = (0, _requireParam.default)('First name'),
    lastName = (0, _requireParam.default)('Last name'),
    email = (0, _requireParam.default)('Email'),
    phoneNumber = (0, _requireParam.default)('Phone number'),
    source,
    dob,
    username = (0, _requireParam.default)('Username'),
    password = (0, _requireParam.default)('Password'),
    createdOn = Date.now(),
    modifiedOn = Date.now()
  } = {}) {
    if (firstName.length < 3) {
      throw new _errors.InvalidPropertyError('First name cannot be less than 3 characters.');
    }

    if (lastName.length < 3) {
      throw new _errors.InvalidPropertyError('Last name cannot be less than 3 characters.');
    }

    if (!isValidEmail(email)) {
      throw new _errors.InvalidPropertyError('Please enter a valid email address.');
    }

    if (!source) {
      throw new _errors.InvalidPropertyError('User must have a valid source.');
    }

    if (!isValidPassword(password)) {
      throw new _errors.InvalidPropertyError('Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.');
    }

    const validSource = makeSource(source);
    return Object.freeze({
      getFirstName: () => upperFirst(firstName),
      getLastName: () => upperFirst(lastName),
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email,
      getSource: () => validSource,
      getUsername: () => username,
      getPassword: () => password,
      getDOB: () => dob,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    });
  };
};

var _default = buildMakeUserFactory;
exports.default = _default;