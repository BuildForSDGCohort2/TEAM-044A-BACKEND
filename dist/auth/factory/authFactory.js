"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildAuthFactory = () => {
  return function makeAuth({
    email,
    password
  } = {}) {
    if (!email) {
      throw new Error('Email is required.');
    }

    if (!password) {
      throw new Error('Password is required.');
    }

    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password
    });
  };
};

var _default = buildAuthFactory;
exports.default = _default;