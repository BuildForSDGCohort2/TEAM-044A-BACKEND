"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postReleaseFunds = exports.postPayment = void 0;

var _postInitiatePayment = _interopRequireDefault(require("./postInitiatePayment"));

var _postReleaseFunds = _interopRequireDefault(require("./post-release-funds"));

var _useCases = require("../use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postPayment = (0, _postInitiatePayment.default)({
  sendMoney: _useCases.sendMoney
});
exports.postPayment = postPayment;
const postReleaseFunds = (0, _postReleaseFunds.default)({
  releaseFunds: _useCases.releaseFunds
});
exports.postReleaseFunds = postReleaseFunds;