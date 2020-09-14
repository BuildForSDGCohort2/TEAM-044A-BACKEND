"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeVerifyEmail = ({
  decodeToken,
  transactionDb
}) => {
  return async function verifyEmail({ ...details
  } = {}) {
    const toDecode = decodeToken(details.token);
    let {
      emailVerified,
      id
    } = toDecode;

    if (!emailVerified) {
      emailVerified = true;
      return transactionDb.update({
        emailVerified,
        id
      });
    }

    throw new _errors.InvalidPropertyError('Email has been verified already');
  };
};

var _default = makeVerifyEmail;
exports.default = _default;