"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listDisputes = exports.editDispute = exports.addDispute = void 0;

var _addDispute = _interopRequireDefault(require("./addDispute"));

var _editDispute = _interopRequireDefault(require("./editDispute"));

var _listDisputes = _interopRequireDefault(require("./listDisputes"));

var _models = _interopRequireDefault(require("../models"));

var _models2 = _interopRequireDefault(require("../../transactions/models"));

var _model = _interopRequireDefault(require("../../users/model"));

var _mail = require("../../mail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addDispute = (0, _addDispute.default)({
  transactionDb: _models2.default,
  disputeDb: _models.default,
  sendDisputeMail: _mail.sendDisputeMail
});
exports.addDispute = addDispute;
const editDispute = (0, _editDispute.default)({
  transactionDb: _models2.default,
  disputeDb: _models.default
});
exports.editDispute = editDispute;
const listDisputes = (0, _listDisputes.default)({
  disputeDb: _models.default
});
exports.listDisputes = listDisputes;