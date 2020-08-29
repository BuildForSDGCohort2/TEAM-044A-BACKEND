"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../transactions/controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/transactions';
exports.path = path;

function config(router) {
  router.get('/', (0, _express.default)(_controllers.getTransactions)).get('/:ref', (0, _express.default)(_controllers.getTransactions)).post('/', (0, _express.default)(_controllers.postTransaction)).post('/accept-transaction/:ref', (0, _express.default)(_controllers.postAcceptTransaction)).post('/reject-delivery/:ref', (0, _express.default)(_controllers.postRejectDelivery)).post('/reject/:ref', (0, _express.default)(_controllers.rejectTransactions)) // reject initial transaction request
  .post('/deliver/:ref', (0, _express.default)(_controllers.postDeliverTransaction)) // sets transaction status to deliver
  .post('/confirm/:ref', (0, _express.default)(_controllers.postConfirmTransaction)).post('/progress/:ref', (0, _express.default)(_controllers.postInProgress)); // sets transaction status to in progress

  return router;
}