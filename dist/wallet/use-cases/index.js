"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walletWithdraw = exports.walletTransfer = exports.walletDeposit = exports.createWallet = void 0;

var _createWallet = _interopRequireDefault(require("./createWallet"));

var _walletDeposit = _interopRequireDefault(require("./walletDeposit"));

var _walletTransfer = _interopRequireDefault(require("./walletTransfer"));

var _walletWithdraw = _interopRequireDefault(require("./walletWithdraw"));

var _models = _interopRequireDefault(require("../models"));

var _model = _interopRequireDefault(require("../../users/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const createWallet = (0, _createWallet.default)({
  walletDb: _models.default,
  usersDb: _model.default
});
exports.createWallet = createWallet;
const walletDeposit = (0, _walletDeposit.default)({
  walletDb: _models.default
});
exports.walletDeposit = walletDeposit;
const walletTransfer = (0, _walletTransfer.default)({
  walletDb: _models.default,
  usersDb: _model.default
});
exports.walletTransfer = walletTransfer;
const walletWithdraw = (0, _walletWithdraw.default)({
  walletDb: _models.default
});
exports.walletWithdraw = walletWithdraw;