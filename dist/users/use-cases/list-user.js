"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeListUser = ({
  usersDb
}) => {
  return async function listUser({
    id
  } = {}) {
    return await usersDb.findById({
      id
    });
  };
};

var _default = makeListUser;
exports.default = _default;