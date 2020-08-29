"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */

/* eslint-disable consistent-return */
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
    emailVerified = true;
    return await transactionDb.update({
      emailVerified,
      id
    });
  };
};

var _default = makeVerifyEmail;
exports.default = _default;