"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatabaseError = exports.UnauthorizedError = exports.UniqueConstraintError = exports.InvalidPropertyError = exports.RequiredParameterError = void 0;

/* eslint-disable max-classes-per-file */
class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} cannot be null or undefined.`);
    this.name = 'RequiredParameterError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }

}

exports.RequiredParameterError = RequiredParameterError;

class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must be unique.`);
    this.name = 'UniqueConstraintError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }

}

exports.UniqueConstraintError = UniqueConstraintError;

class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'InvalidPropertyError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }

}

exports.InvalidPropertyError = InvalidPropertyError;

class UnauthorizedError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }

}

exports.UnauthorizedError = UnauthorizedError;

class DatabaseError extends Error {
  constructor(message, statusCode = 503) {
    super(message);
    this.name = 'MongoDBError';
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
  }

}

exports.DatabaseError = DatabaseError;