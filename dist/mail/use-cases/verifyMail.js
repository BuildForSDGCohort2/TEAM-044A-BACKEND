"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable prefer-const */

/* eslint-disable no-useless-catch */

/* eslint-disable consistent-return */
const makeVerifyEmail = ({
  decodeToken,
  transactionDb
}) => {
  return async function verifyEmail({ ...details
  } = {}) {
    try {
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
    } catch (error) {
      throw error;
    }
  };
};

var _default = makeVerifyEmail;
exports.default = _default;