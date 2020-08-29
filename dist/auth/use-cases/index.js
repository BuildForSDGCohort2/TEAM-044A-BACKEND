"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listUser = exports.loginUser = void 0;

var _login = _interopRequireDefault(require("./login"));

var _getUser = _interopRequireDefault(require("./get-user"));

var _jsonwt = require("../../helpers/jsonwt");

var _model = _interopRequireDefault(require("../../users/model"));

var _models = _interopRequireDefault(require("../../transactions/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginUser = (0, _login.default)({
  usersDb: _model.default,
  sendTokenResponse: _jsonwt.sendTokenResponse
});
exports.loginUser = loginUser;
const listUser = (0, _getUser.default)({
  usersDb: _model.default,
  transactionDb: _models.default
});
exports.listUser = listUser;