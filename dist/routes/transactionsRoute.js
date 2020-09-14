"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../transactions/controllers");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/transactions';
exports.path = path;

function config(router) {
  router.get('/', (0, _express.default)((0, _auth.default)(_controllers.getTransactions))).get('/:ref', (0, _express.default)((0, _auth.default)(_controllers.getTransactions))).post('/', (0, _express.default)((0, _auth.default)(_controllers.postTransaction))).patch('/accept-transaction/:ref', (0, _express.default)((0, _auth.default)(_controllers.postAcceptTransaction))).patch('/reject-delivery/:ref', (0, _express.default)((0, _auth.default)(_controllers.postRejectDelivery))).patch('/reject/:ref', (0, _express.default)((0, _auth.default)(_controllers.rejectTransactions))) // reject initial transaction request
  .patch('/deliver/:ref', (0, _express.default)((0, _auth.default)(_controllers.postDeliverTransaction))) // sets transaction status to deliver
  .patch('/confirm/:ref', (0, _express.default)((0, _auth.default)(_controllers.postConfirmTransaction))).patch('/progress/:ref', (0, _express.default)((0, _auth.default)(_controllers.postInProgress))); // sets transaction status to in progress

  return router;
}