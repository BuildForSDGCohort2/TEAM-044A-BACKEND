"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @function makeRejectTransactionRequest
 * POST - It rejects the current transaction request.
 * Transaction Status is set to `Transaction Request Rejected`
 */
const makeRejectTransactionRequest = ({
  transactionDb,
  sendRejectionMail,
  usersDb
}) => {
  return async function rejectTransaction({
    ref
  }) {
    const currentTransaction = await transactionDb.findByRef({
      ref
    });
    let {
      transactionStatus,
      _id,
      initiator
    } = currentTransaction;
    const user = await usersDb.findById({
      id: initiator
    });
    transactionStatus = 'Transaction Request Rejected';
    await Promise.all([transactionDb.update({
      id: _id,
      transactionStatus
    }), sendRejectionMail({
      ref,
      user
    })]);
  };
};

var _default = makeRejectTransactionRequest;
exports.default = _default;