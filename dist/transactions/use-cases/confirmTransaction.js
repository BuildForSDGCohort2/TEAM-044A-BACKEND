"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeConfirmTransaction = ({
  transactionDb,
  sendConfirmEmail,
  DisbursementAPI
}) => {
  return async function confirmTransation({
    ref
  } = {}) {
    const currentTransaction = await transactionDb.findByRef({
      ref
    });
    let {
      transactionStatus
    } = currentTransaction;
    const {
      _id,
      initiator
    } = currentTransaction;
    transactionStatus = 'Buyer confirmed Order';
    const [updated] = await Promise.all([transactionDb.update({
      id: _id,
      transactionStatus
    }), sendConfirmEmail({
      ref,
      initiator
    })]);
    const fund = new DisbursementAPI();
    fund.on('transferMoney', () => {}).releaseFunds({
      transactionID: _id
    });
    return updated;
  };
};

var _default = makeConfirmTransaction;
exports.default = _default;