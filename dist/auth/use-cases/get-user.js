"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeListUser = ({
  usersDb,
  transactionDb
}) => {
  return async function listUser({
    id
  } = {}) {
    if (!id) {
      throw new Error('User must have a valid id.');
    }

    const user = await usersDb.findById({
      id
    });
    const {
      email
    } = user;
    return await transactionDb.findMyTransactions(email);
  };
};

var _default = makeListUser;
exports.default = _default;