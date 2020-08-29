"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.postLogin = void 0;

var _postLogin = _interopRequireDefault(require("./post-login"));

var _getUser = _interopRequireDefault(require("./get-user"));

var _useCases = require("../use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postLogin = (0, _postLogin.default)({
  loginUser: _useCases.loginUser
});
exports.postLogin = postLogin;
const getUser = (0, _getUser.default)({
  listUser: _useCases.listUser
});
exports.getUser = getUser;