"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postWithdraw = exports.postTransfer = exports.postDeposit = exports.postWallet = void 0;

var _postCreateWallet = _interopRequireDefault(require("./postCreateWallet"));

var _postDeposit = _interopRequireDefault(require("./postDeposit"));

var _postTransfer = _interopRequireDefault(require("./postTransfer"));

var _postWithdraw = _interopRequireDefault(require("./postWithdraw"));

var _useCases = require("../use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postWallet = (0, _postCreateWallet.default)({
  createWallet: _useCases.createWallet
});
exports.postWallet = postWallet;
const postDeposit = (0, _postDeposit.default)({
  walletDeposit: _useCases.walletDeposit
});
exports.postDeposit = postDeposit;
const postTransfer = (0, _postTransfer.default)({
  walletTransfer: _useCases.walletTransfer
});
exports.postTransfer = postTransfer;
const postWithdraw = (0, _postWithdraw.default)({
  walletWithdraw: _useCases.walletWithdraw
});
exports.postWithdraw = postWithdraw;