"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = _interopRequireDefault(require("../mail/controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/email';
exports.path = path;

function config(router) {
  router.get('/verify/:token', (0, _express.default)(_controllers.default));
  return router;
}