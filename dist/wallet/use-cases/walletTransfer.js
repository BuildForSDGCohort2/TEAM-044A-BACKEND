"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWalletTransfer;

var _errors = require("../../helpers/errors");

var _factory = _interopRequireDefault(require("../factory"));

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeWalletTransfer({
  walletDb,
  usersDb
}) {
  return async function walletTransfer({
    id = (0, _requireParam.default)('User Id'),
    ...walletDetails
  }) {
    const transfer = (0, _factory.default)(walletDetails);
    const foundUser = await usersDb.findById({
      id
    });

    if (!foundUser) {
      throw new _errors.InvalidPropertyError('User does not exist.');
    }

    const {
      walletId,
      _id
    } = foundUser;
    const sender = await walletDb.findByAccountId({
      id: walletId
    });

    if (!sender) {
      throw new _errors.InvalidPropertyError('Wallet does not exist.');
    }

    const {
      balance
    } = sender;

    if (balance < walletDetails.amount || balance <= 0) {
      throw new _errors.InvalidPropertyError('Insufficient funds to perform this operation.');
    }

    const {
      destinationWalletId
    } = walletDetails;
    const found = await walletDb.findByAccountId({
      id: destinationWalletId
    });

    if (!found) {
      throw new _errors.InvalidPropertyError('Account number does not exist.');
    }

    return walletDb.transfer({
      destinationWalletId: transfer.getDestinationAccount(),
      amount: transfer.getAmount(),
      operationType: transfer.getOperation(),
      reference: transfer.getRef(),
      createdAt: transfer.getCreatedAt(),
      userId: _id
    });
  };
}