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

const path = '/api/v1/payment';
exports.path = path;

function config(router) {
  router.post('/paystack/callback', (0, _express.default)((0, _auth.default)(_controllers.verifyPaystack)));
  return router;
}