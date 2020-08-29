"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from '../../database/index'
const escrowSchema = new _mongoose.default.Schema({
  totalAmount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  buyerId: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'User'
  },
  transactionId: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'Transaction'
  },
  escrowCharge: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paymentMadeAt: {
    type: Date,
    default: Date.now()
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
var _default = escrowSchema;
exports.default = _default;