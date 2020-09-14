"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const types = ['deposit', 'withdraw', 'transfer', 'fee'];
const walletTransactionSchema = new _mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  reference: {
    type: String
  },
  operationType: {
    type: String,
    required: true,
    enum: types
  },
  userId: {
    type: _mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinationWalletId: {
    type: _mongoose.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  }
});
var _default = walletTransactionSchema;
exports.default = _default;