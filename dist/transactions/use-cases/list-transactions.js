"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeListTransactions = ({
  transactionDb
}) => {
  return async function listTransactions({
    ref
  } = {}) {
    return ref ? await transactionDb.findByRef({
      ref
    }) : await transactionDb.findAll();
  };
};

var _default = makeListTransactions;
exports.default = _default;