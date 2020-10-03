"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../disputes/controllers");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/disputes';
exports.path = path;

function config(router) {
  router.post('/', (0, _express.default)((0, _auth.default)(_controllers.postDispute))).get('/', (0, _express.default)((0, _auth.default)(_controllers.getDisputes))).get('/:id', (0, _express.default)((0, _auth.default)(_controllers.getDisputes))).patch('/:id', (0, _express.default)((0, _auth.default)(_controllers.patchDispute)));
  return router;
}