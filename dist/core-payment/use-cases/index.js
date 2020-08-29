"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cronTest = exports.releaseFunds = exports.sendMoney = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _initiatePayment = _interopRequireDefault(require("./initiatePayment"));

var _releaseFunds = _interopRequireDefault(require("./releaseFunds"));

var _cronTest = _interopRequireDefault(require("./cronTest"));

var _mail = require("../../mail");

var _model = _interopRequireDefault(require("../../users/model"));

var _models = _interopRequireDefault(require("../../transactions/models"));

var _models2 = _interopRequireDefault(require("../models"));

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendMoney = (0, _initiatePayment.default)({
  usersDb: _model.default,
  transactionDb: _models.default,
  sendNotificationEmail: _mail.sendNotificationEmail
});
exports.sendMoney = sendMoney;
const releaseFunds = (0, _releaseFunds.default)({
  escrowDb: _models2.default,
  usersDb: _model.default,
  moment: _moment.default,
  setCronJob: _utils.setCronJob,
  transactionDb: _models.default
});
exports.releaseFunds = releaseFunds;
const cronTest = (0, _cronTest.default)({
  escrowDb: _models2.default,
  transactionDb: _models.default,
  usersDb: _model.default,
  moment: _moment.default
});
exports.cronTest = cronTest;