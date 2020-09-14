"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWalletDeposit;

var _factory = _interopRequireDefault(require("../factory"));

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeWalletDeposit({
  walletDb
}) {
  return async function walletDeposit({
    userId = (0, _requireParam.default)('User Id'),
    ...walletDetails
  }) {
    const newDeposit = (0, _factory.default)(walletDetails);
    return walletDb.deposit({
      amount: newDeposit.getAmount(),
      operationType: newDeposit.getOperation(),
      createdAt: newDeposit.getCreatedAt(),
      reference: newDeposit.getRef(),
      userId
    });
  };
}