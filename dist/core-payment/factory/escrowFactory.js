"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeEscrowDetails;

/* eslint-disable no-return-assign */
function buildMakeEscrowDetails({
  uuidv4
}) {
  return function makeEscrow({
    totalAmount,
    reference,
    buyerId
  } = {}) {
    if (!totalAmount || typeof totalAmount !== 'number') {
      throw new Error('Amount must be a valid number');
    }

    if (!reference) {
      throw new Error('You must include a reference id.');
    }

    if (!buyerId) {
      throw new Error('You must specify buyer id.');
    }

    let paymentId;
    let escrowCharge;

    if (totalAmount >= 200000) {
      escrowCharge = 0.025 * totalAmount + 100;
    } else {
      escrowCharge = 0.02 * totalAmount;
    }

    function generateId() {
      return uuidv4();
    }

    return Object.freeze({
      getAmount: () => totalAmount,
      getReference: () => reference,
      getBuyerId: () => buyerId,
      getPaymentId: () => paymentId || (paymentId = generateId()),
      getEscrowCharge: () => escrowCharge
    });
  };
}