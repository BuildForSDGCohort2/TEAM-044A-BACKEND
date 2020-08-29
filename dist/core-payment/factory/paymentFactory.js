"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildMakePayMentDetails = () => {
  return function makePayment({
    transactionAmount,
    senderAccountBalance,
    receiverId
  } = {}) {
    if (!transactionAmount || typeof transactionAmount !== 'number') {
      throw new Error('Please enter a valid transaction amount.');
    }

    if (!senderAccountBalance || typeof senderAccountBalance !== 'number') {
      throw new Error('Please enter a valid amount to send.');
    }

    if (!receiverId) {
      throw new Error('Receiver email is required.');
    }

    if (senderAccountBalance < transactionAmount || senderAccountBalance <= 0) {
      throw new Error('You do not have sufficient amount to carryout this transaction.');
    }

    return Object.freeze({
      getReceiver: () => receiverId,
      getAmountToPay: () => transactionAmount
    });
  };
};

var _default = buildMakePayMentDetails;
exports.default = _default;