"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postRejectDelivery = exports.postInProgress = exports.postConfirmTransaction = exports.postDeliverTransaction = exports.rejectTransactions = exports.postAcceptTransaction = exports.getTransactions = exports.postTransaction = void 0;

var _postTransaction = _interopRequireDefault(require("./post-transaction"));

var _getTransactions = _interopRequireDefault(require("./get-transactions"));

var _acceptTransaction = _interopRequireDefault(require("./accept-transaction"));

var _postRejectTransaction = _interopRequireDefault(require("./postRejectTransaction"));

var _postDeliveryTransaction = _interopRequireDefault(require("./postDeliveryTransaction"));

var _postConfirmTransaction = _interopRequireDefault(require("./postConfirmTransaction"));

var _postInProgress = _interopRequireDefault(require("./postInProgress"));

var _postRejectDelivery = _interopRequireDefault(require("./postRejectDelivery"));

var _useCases = require("../use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postTransaction = (0, _postTransaction.default)({
  createTransaction: _useCases.createTransaction
});
exports.postTransaction = postTransaction;
const getTransactions = (0, _getTransactions.default)({
  listTransactions: _useCases.listTransactions
});
exports.getTransactions = getTransactions;
const postAcceptTransaction = (0, _acceptTransaction.default)({
  acceptTransaction: _useCases.acceptTransaction
});
exports.postAcceptTransaction = postAcceptTransaction;
const rejectTransactions = (0, _postRejectTransaction.default)({
  rejectTransactionRequest: _useCases.rejectTransactionRequest
});
exports.rejectTransactions = rejectTransactions;
const postDeliverTransaction = (0, _postDeliveryTransaction.default)({
  deliveryComplete: _useCases.deliveryComplete
});
exports.postDeliverTransaction = postDeliverTransaction;
const postConfirmTransaction = (0, _postConfirmTransaction.default)({
  confirmTransaction: _useCases.confirmTransaction
});
exports.postConfirmTransaction = postConfirmTransaction;
const postRejectDelivery = (0, _postRejectDelivery.default)({
  rejectDeliveredTransaction: _useCases.rejectDeliveredTransaction
});
exports.postRejectDelivery = postRejectDelivery;
const postInProgress = (0, _postInProgress.default)({
  inProgress: _useCases.inProgress
});
exports.postInProgress = postInProgress;