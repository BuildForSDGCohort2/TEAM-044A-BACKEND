"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authFactory = _interopRequireDefault(require("./authFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeAuth = (0, _authFactory.default)();
var _default = makeAuth;
exports.default = _default;