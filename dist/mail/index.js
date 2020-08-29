"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendDisputeMail = exports.sendDeliveryRejectionEmail = exports.sendInProgressEmail = exports.sendTransactionMail = exports.sendConfirmEmail = exports.sendDeliveryEmail = exports.sendRejectionMail = exports.sendNotificationEmail = exports.sendAcceptanceEmail = exports.verifyEmail = void 0;

var _verifyMail = _interopRequireDefault(require("./use-cases/verifyMail"));

var _sendAcceptancemail = _interopRequireDefault(require("./use-cases/sendAcceptancemail"));

var _sendNotificationEmail = _interopRequireDefault(require("./use-cases/sendNotificationEmail"));

var _sendRejectionMail = _interopRequireDefault(require("./use-cases/sendRejectionMail"));

var _sendDeliveryMail = _interopRequireDefault(require("./use-cases/sendDeliveryMail"));

var _sendConfirmTransaction = _interopRequireDefault(require("./use-cases/sendConfirmTransaction"));

var _sendCreateTransaction = _interopRequireDefault(require("./use-cases/sendCreateTransaction"));

var _sendInProgressMail = _interopRequireDefault(require("./use-cases/sendInProgressMail"));

var _deliveryRejectionMail = _interopRequireDefault(require("./use-cases/deliveryRejectionMail"));

var _sendDisputeMail = _interopRequireDefault(require("./use-cases/sendDisputeMail"));

var _dashboard = _interopRequireDefault(require("./use-cases/dashboard"));

var _jsonwt = require("../helpers/jsonwt");

var _models = _interopRequireDefault(require("../transactions/models"));

var _sendMail = _interopRequireDefault(require("./sendMail"));

var _model = _interopRequireDefault(require("../users/model"));

var _index = require("./types/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyEmail = (0, _verifyMail.default)({
  decodeToken: _jsonwt.decodeToken,
  sendTokenResponse: _jsonwt.sendTokenResponse,
  transactionDb: _models.default
}); // Notifies the buyer that the seller has accepted to be paid XYZ amount

exports.verifyEmail = verifyEmail;
const sendAcceptanceEmail = (0, _sendAcceptancemail.default)({
  transactionDb: _models.default,
  transactionEmailTemplate: _index.transactionEmailTemplate,
  dashboardURL: _dashboard.default,
  sendMail: _sendMail.default,
  usersDb: _model.default
}); // Notifies the seller that the money has been paid into escrow

exports.sendAcceptanceEmail = sendAcceptanceEmail;
const sendNotificationEmail = (0, _sendNotificationEmail.default)({
  transactionDb: _models.default,
  sendMail: _sendMail.default,
  acceptanceEmailTemplate: _index.acceptanceEmailTemplate,
  dashboardURL: _dashboard.default
}); // Sends rejection mail to the recipient

exports.sendNotificationEmail = sendNotificationEmail;
const sendRejectionMail = (0, _sendRejectionMail.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendMail: _sendMail.default,
  dashboardURL: _dashboard.default,
  rejectionEmailTemplate: _index.rejectionEmailTemplate
}); // Sends mail signifying rejection of shipped product

exports.sendRejectionMail = sendRejectionMail;
const sendDeliveryRejectionEmail = (0, _deliveryRejectionMail.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendMail: _sendMail.default,
  dashboardURL: _dashboard.default,
  deliveryRejectionTemplate: _index.deliveryRejectionTemplate
}); // for creating disputes

exports.sendDeliveryRejectionEmail = sendDeliveryRejectionEmail;
const sendDisputeMail = (0, _sendDisputeMail.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendMail: _sendMail.default,
  dashboardURL: _dashboard.default,
  disputeMailTemplate: _index.disputeMailTemplate
}); // sends mail to buyer/initiator of the transaction to signify delivery on its way

exports.sendDisputeMail = sendDisputeMail;
const sendDeliveryEmail = (0, _sendDeliveryMail.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendMail: _sendMail.default,
  deliveryEmailTemplate: _index.deliveryEmailTemplate,
  dashboardURL: _dashboard.default
}); // sends mail to recipient of the transaction to signify confirmation of delivered products

exports.sendDeliveryEmail = sendDeliveryEmail;
const sendConfirmEmail = (0, _sendConfirmTransaction.default)({
  transactionDb: _models.default,
  sendMail: _sendMail.default,
  dashboardURL: _dashboard.default,
  confirmEmailTemplate: _index.confirmEmailTemplate
}); // sends initial transaction mail to accept or decline

exports.sendConfirmEmail = sendConfirmEmail;
const sendTransactionMail = (0, _sendCreateTransaction.default)({
  transactionDb: _models.default,
  usersDb: _model.default,
  sendMail: _sendMail.default,
  getTransactionEmailURL: _index.getTransactionEmailURL,
  createToken: _jsonwt.createToken,
  createTransactionTemplate: _index.createTransactionTemplate
});
exports.sendTransactionMail = sendTransactionMail;
const sendInProgressEmail = (0, _sendInProgressMail.default)({
  transactionDb: _models.default,
  sendMail: _sendMail.default,
  dashboardURL: _dashboard.default,
  inProgressEmailTemplate: _index.inProgressEmailTemplate,
  usersDb: _model.default
});
exports.sendInProgressEmail = sendInProgressEmail;