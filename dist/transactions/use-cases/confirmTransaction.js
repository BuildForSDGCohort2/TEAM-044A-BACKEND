"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeConfirmTransaction = ({
  transactionDb,
  sendConfirmEmail
}) => {
  return async function confirmTransation({
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
    transactionStatus = 'Buyer confirmed Order';
    const [updated, email] = await Promise.all([transactionDb.update({
      id: _id,
      transactionStatus
    }), sendConfirmEmail({
      ref,
      initiator
    })]);
    return updated; // trigger pay of
  };
};

var _default = makeConfirmTransaction;
exports.default = _default;