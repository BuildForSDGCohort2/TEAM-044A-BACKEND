"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from '../../database'
const disputeSchema = new _mongoose.default.Schema({
  transactionId: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'Transaction'
  },
  decision: {
    type: String
  },
  disputeStatus: {
    type: String,
    enum: ['Open', 'Resolved'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});
var _default = disputeSchema;
exports.default = _default;