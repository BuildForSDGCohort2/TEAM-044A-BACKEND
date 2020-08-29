"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../disputes/controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/disputes';
exports.path = path;

function config(router) {
  router.post('/', (0, _express.default)(_controllers.postDispute)).get('/', (0, _express.default)(_controllers.getDisputes)).get('/:id', (0, _express.default)(_controllers.getDisputes)).patch('/:id', (0, _express.default)(_controllers.patchDispute));
  return router;
}