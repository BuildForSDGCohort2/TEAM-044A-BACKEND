"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeVerifyEmail = ({
  decodeToken,
  usersDb
}) => {
  return async function verifyEmail({ ...details
  } = {}) {
    const toDecode = decodeToken(details.token);
    let {
      isVerified,
      userId
    } = toDecode;
    isVerified = true;
    return usersDb.update({
      isVerified,
      id: userId
    });
  };
};

var _default = makeVerifyEmail;
exports.default = _default;