"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildMakeUserFactory = ({
  upperFirst,
  isValidEmail,
  isValidPassword,
  makeSource
}) => {
  return function makeUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    source,
    dob,
    username,
    password,
    createdOn = Date.now(),
    modifiedOn = Date.now()
  } = {}) {
    if (!firstName) {
      throw new Error('First name is required.');
    }

    if (!lastName) {
      throw new Error('Last name is required.');
    }

    if (!email) {
      throw new Error('Email address is required.');
    }

    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address.');
    }

    if (!phoneNumber) {
      throw new Error('Please enter a valid phone number.');
    }

    if (!source) {
      throw new Error('User must have a valid source.');
    }

    if (!username) {
      throw new Error('User must have a valid username.');
    }

    if (!password) {
      throw new Error('Please enter a valid password.');
    }

    if (!isValidPassword(password)) {
      throw new Error('Password must be at least 8 characters long and must contain at least one Uppercase character and one special sign.');
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