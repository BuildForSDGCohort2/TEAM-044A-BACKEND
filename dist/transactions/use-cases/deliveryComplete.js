"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable prefer-const */
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
    const [updated] = await Promise.all([transactionDb.update({
      id: _id,
      transactionStatus,
      tag: 'bco'
    }), sendDeliveryEmail({
      ref,
      initiator
    })]);
    return updated;
  };
};

var _default = makeDeliveryComplete;
exports.default = _default;