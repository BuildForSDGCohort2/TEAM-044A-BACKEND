"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userModel = _interopRequireDefault(require("../users/model/userModel"));

var _transactionModel = _interopRequireDefault(require("../transactions/models/transactionModel"));

var _escrowModel = _interopRequireDefault(require("../core-payment/models/escrowModel"));

var _disputeModel = _interopRequireDefault(require("../disputes/models/disputeModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const models = {
  User: _mongoose.default.model('User', _userModel.default),
  Transaction: _mongoose.default.model('Transaction', _transactionModel.default),
  Escrow: _mongoose.default.model('Escrow', _escrowModel.default),
  Dispute: _mongoose.default.model('Dispute', _disputeModel.default)
};
Object.values(models).forEach(model => {
  if (!model) {
    model.createCollection();
  }
});
var _default = models;
exports.default = _default;