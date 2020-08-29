"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postVerify = _interopRequireDefault(require("./post-verify"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMail = (0, _postVerify.default)({
  verifyEmail: _index.verifyEmail
});
var _default = getMail;
exports.default = _default;