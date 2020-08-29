"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveToEscrow;

var _factory = require("../factory");

function saveToEscrow({
  escrowDb
}) {
  return async function sendToEscrow({ ...transactionDetails
  }) {
    const newPayment = (0, _factory.makeEscrow)({ ...transactionDetails
    });
    return escrowDb.insert({
      amount: newPayment.getAmount(),
      reference: newPayment.getReference(),
      buyerId: newPayment.getBuyerId(),
      sellerId: newPayment.getSellerId(),
      inspectionPeriod: newPayment.getPeriod(),
      dueDate: newPayment.getDate(),
      transactionStatus: newPayment.getTransactionStatus()
    });
  };
}