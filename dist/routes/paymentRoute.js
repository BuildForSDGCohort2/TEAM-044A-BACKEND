"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../core-payment/controllers");

var _fundTransaction = require("../transactions/use-cases/fundTransaction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/payment';
exports.path = path;

function config(router) {
  router.post('/:ref', (0, _express.default)(_controllers.postPayment)).post('/pay/:referenceId', (0, _express.default)(_controllers.postReleaseFunds)).post('/paystack/pay/:ref', _fundTransaction.createTransaction).get('/paystack/callback', _fundTransaction.verifyTransaction);
  return router;
}