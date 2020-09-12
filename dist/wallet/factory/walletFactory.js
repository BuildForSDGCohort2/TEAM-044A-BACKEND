"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeWalletFactory;

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-return-assign */
function buildMakeWalletFactory({
  uuidv4
}) {
  return function makeWallet({
    amount = (0, _requireParam.default)('Amount'),
    operationType = (0, _requireParam.default)('Type'),
    destinationWalletId,
    createdAt = Date.now()
  } = {}) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new _errors.InvalidPropertyError('Amount must be a valid number and must be greater than zero.');
    }

    if (!operationType) {
      throw new _errors.RequiredParameterError('Operation type e.g deposit or withdraw');
    }

    let reference;

    function makeRef() {
      return uuidv4();
    }

    return Object.freeze({
      getAmount: () => amount,
      getRef: () => reference || (reference = makeRef()),
      getOperation: () => operationType,
      getCreatedAt: () => createdAt,
      getDestinationAccount: () => destinationWalletId
    });
  };
}