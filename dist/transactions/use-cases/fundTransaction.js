"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mail = require("../../mail");

var _factory = require("../../core-payment/factory");

const makeVerifyTransaction = ({
  transactionDb,
  escrowDb
}) => {
  return async ({
    user,
    ...details
  }) => {
    const {
      totalAmount
    } = details;
    const {
      reference
    } = details.details;

    try {
      const ref = reference;
      const buyerId = user.id;
      const found = await transactionDb.findByRef({
        ref
      });
      const depositedFund = (0, _factory.makeEscrow)({
        totalAmount,
        reference,
        buyerId
      });
      const payment = {
        totalAmount: depositedFund.getAmount(),
        reference: depositedFund.getReference(),
        buyerId: depositedFund.getBuyerId(),
        escrowCharge: depositedFund.getEscrowCharge(),
        transactionId: found._id,
        isPaid: true
      };
      const [deposit, updated] = await Promise.all([escrowDb.deposit(payment), transactionDb.update({
        id: found._id,
        transactionStatus: 'Accepted and Funded',
        tag: 'bft'
      }), (0, _mail.sendNotificationEmail)({
        ref,
        user
      })]);
      return [deposit, updated];
    } catch (error) {
      console.error(error);
    }
  };
};

var _default = makeVerifyTransaction;
exports.default = _default;