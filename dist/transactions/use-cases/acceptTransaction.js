"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-underscore-dangle */
const makeAcceptTransaction = ({
  transactionDb,
  sendAcceptanceEmail
}) => {
  return async function acceptTransaction({
    ref
  } = {}) {
    const currentTransaction = await transactionDb.findByRef({
      ref
    });
    let {
      transactionStatus,
      _id,
      initiator
    } = currentTransaction;
    transactionStatus = 'Transaction Accepted - Not funded';
    const [updated, email] = await Promise.all([transactionDb.update({
      id: _id,
      transactionStatus
    }), sendAcceptanceEmail({
      _id,
      initiator
    })]);
    return updated;
  };
};

var _default = makeAcceptTransaction;
exports.default = _default;