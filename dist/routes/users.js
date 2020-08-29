"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../users/controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/users';
exports.path = path;

function config(router) {
  router.get('/', (req, res) => res.json({
    msg: 'Hello'
  })).post('/', (0, _express.default)(_controllers.postUser));
  return router;
}