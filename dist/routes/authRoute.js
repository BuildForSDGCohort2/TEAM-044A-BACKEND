"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _express = _interopRequireDefault(require("../express"));

var _controllers = require("../auth/controllers");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/api/v1/auth';
exports.path = path;

function config(router) {
  router.get('/', (0, _express.default)((0, _auth.default)(_controllers.getUser))).post('/', (0, _express.default)(_controllers.postLogin));
  return router;
}