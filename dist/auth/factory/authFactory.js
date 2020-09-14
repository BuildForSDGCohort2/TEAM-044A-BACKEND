"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const buildAuthFactory = () => {
  return function makeAuth({
    email,
    password
  } = {}) {
    if (!email) {
      throw new _errors.RequiredParameterError('Email');
    }

    if (!password) {
      throw new _errors.RequiredParameterError('Password');
    }

    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password
    });
  };
};

var _default = buildAuthFactory;
exports.default = _default;