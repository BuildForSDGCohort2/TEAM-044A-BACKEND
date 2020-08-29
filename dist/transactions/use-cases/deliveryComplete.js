"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeDeliveryComplete = ({
  transactionDb,
  sendDeliveryEmail
}) => {
  return async function deliveryComplete({
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
    transactionStatus = 'Delivered';
    const [updated, email] = await Promise.all([transactionDb.update({
      id: _id,
      transactionStatus
    }), sendDeliveryEmail({
      ref,
      initiator
    })]);
    return updated;
  };
};

var _default = makeDeliveryComplete;
exports.default = _default;