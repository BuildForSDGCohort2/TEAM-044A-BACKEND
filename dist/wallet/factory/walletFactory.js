"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeWalletFactory;

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildMakeWalletFactory() {
  return function makeWallet({
    amount = (0, _requireParam.default)('Amount')
  } = {}) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new _errors.InvalidPropertyError('Amount must be a valid number and must be greater than zero.');
    }

    return Object.freeze({
      getAmount: () => amount
    });
  };
}