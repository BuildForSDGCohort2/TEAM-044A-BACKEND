"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("./http-response");

var _errors = require("./errors");

/* eslint-disable no-nested-ternary */
const tryCatchHandler = fn => (req, res, ...otherParams) => {
  return Promise.resolve(fn(req, res, ...otherParams)).catch(error => {
    return (0, _httpResponse.makeHttpError)({
      errorMessage: error.message,
      title: error.name,
      stack: error.stack,
      statusCode: error instanceof _errors.UniqueConstraintError ? 409 : error instanceof _errors.InvalidPropertyError || error instanceof _errors.RequiredParameterError ? 400 : 500 || error instanceof _errors.UnauthorizedError ? error.statusCode : 401
    });
  });
};

var _default = tryCatchHandler;
exports.default = _default;