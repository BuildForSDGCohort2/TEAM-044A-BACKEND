"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../wallet/controllers");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/wallet';
exports.path = path;

function config(router) {
  router.get('/history', (0, _express.default)((0, _auth.default)(_controllers.getHistory))).post('/', (0, _express.default)((0, _auth.default)(_controllers.postWallet))).post('/deposit', (0, _express.default)((0, _auth.default)(_controllers.postDeposit))).post('/transfer', (0, _express.default)((0, _auth.default)(_controllers.postTransfer))).post('/withdraw', (0, _express.default)((0, _auth.default)(_controllers.postWithdraw)));
  return router;
}