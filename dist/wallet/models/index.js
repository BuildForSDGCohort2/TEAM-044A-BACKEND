"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _walletDb = _interopRequireDefault(require("./walletDb"));

var _models = _interopRequireDefault(require("../../database/models"));

var _model = _interopRequireDefault(require("../../users/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Wallet,
  WalletTransaction
} = _models.default;
const walletDb = (0, _walletDb.default)({
  WalletTransaction,
  usersDb: _model.default,
  Wallet
});
var _default = walletDb;
exports.default = _default;