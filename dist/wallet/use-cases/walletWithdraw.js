"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWalletWithdrawal;

var _errors = require("../../helpers/errors");

var _factory = _interopRequireDefault(require("../factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeWalletWithdrawal({
  walletDb
}) {
  return async function walletWithdrawal({
    user,
    ...walletDetails
  }) {
    const withdrawal = (0, _factory.default)(walletDetails);
    const {
      _id,
      walletId
    } = user;
    const accountOwner = await walletDb.findByAccountId({
      id: walletId
    });
    const {
      balance
    } = accountOwner; // checks to see if the requested amount is greater than the user's balance

    if (walletDetails.amount > balance) {
      throw new _errors.InvalidPropertyError('Insufficient funds.');
    } // send mail here


    return walletDb.withdraw({
      amount: withdrawal.getAmount(),
      reference: withdrawal.getRef(),
      createdAt: withdrawal.getCreatedAt(),
      operationType: withdrawal.getOperation(),
      userId: _id
    });
  };
}