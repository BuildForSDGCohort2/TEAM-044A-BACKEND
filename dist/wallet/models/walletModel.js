"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const walletSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  },
  walletTransactions: [{
    type: _mongoose.Types.ObjectId,
    ref: 'WalletTransaction',
    required: true
  }]
});
var _default = walletSchema;
exports.default = _default;