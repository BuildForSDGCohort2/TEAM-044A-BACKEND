"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTransaction = exports.inProgress = exports.confirmTransaction = exports.deliveryComplete = exports.rejectTransactionRequest = exports.rejectDeliveredTransaction = exports.acceptTransaction = exports.createTransaction = exports.listTransactions = void 0;

var _createTransaction = _interopRequireDefault(require("./createTransaction"));

var _listTransactions = _interopRequireDefault(require("./list-transactions"));

var _acceptTransaction = _interopRequireDefault(require("./acceptTransaction"));

var _rejectDeliveredTransaction = _interopRequireDefault(require("./rejectDeliveredTransaction"));

var _deliveryComplete = _interopRequireDefault(require("./deliveryComplete"));

var _confirmTransaction = _interopRequireDefault(require("./confirmTransaction"));

var _inProgress = _interopRequireDefault(require("./inProgress"));

var _rejectTransactionRequest = _interopRequireDefault(require("./rejectTransactionRequest"));

var _fundTransaction = _interopRequireDefault(require("./fundTransaction"));

var _publisher = _interopRequireDefault(require("../../pubsub/publisher"));

var _mail = require("../../mail");

var _models = _interopRequireDefault(require("../models"));

var _models2 = _interopRequireDefault(require("../../core-payment/models"));

var _model = _interopRequireDefault(require("../../users/model"));

var _events = _interopRequireDefault(require("../../pubsub/events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createTransaction = (0, _createTransaction.default)({
  transactionDb: _models.default,
  sendTransactionMail: _mail.sendTransactionMail
}); // list transactions

exports.createTransaction = createTransaction;
const listTransactions = (0, _listTransactions.default)({
  transactionDb: _models.default
}); // recipient/seller accepts transactions

exports.listTransactions = listTransactions;
const acceptTransaction = (0, _acceptTransaction.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendAcceptanceEmail: _mail.sendAcceptanceEmail
}); // Rejects delivered product/service

exports.acceptTransaction = acceptTransaction;
const rejectDeliveredTransaction = (0, _rejectDeliveredTransaction.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendDeliveryRejectionEmail: _mail.sendDeliveryRejectionEmail
}); // Rejects initial transaction request

exports.rejectDeliveredTransaction = rejectDeliveredTransaction;
const rejectTransactionRequest = (0, _rejectTransactionRequest.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendRejectionMail: _mail.sendRejectionMail
}); // recipient/seller marks delivery as completed

exports.rejectTransactionRequest = rejectTransactionRequest;
const deliveryComplete = (0, _deliveryComplete.default)({
  transactionDb: _models.default,
  sendDeliveryEmail: _mail.sendDeliveryEmail
}); // buyer/initiator confirms the delivery of shipped product/service

exports.deliveryComplete = deliveryComplete;
const confirmTransaction = (0, _confirmTransaction.default)({
  transactionDb: _models.default,
  sendConfirmEmail: _mail.sendConfirmEmail,
  DisbursementAPI: _events.default,
  publisher: _publisher.default
}); // marks transaction status to be in progress

exports.confirmTransaction = confirmTransaction;
const inProgress = (0, _inProgress.default)({
  transactionDb: _models.default,
  sendInProgressEmail: _mail.sendInProgressEmail,
  usersDb: _model.default
}); // verify transaction

exports.inProgress = inProgress;
const verifyTransaction = (0, _fundTransaction.default)({
  transactionDb: _models.default,
  escrowDb: _models2.default
});
exports.verifyTransaction = verifyTransaction;