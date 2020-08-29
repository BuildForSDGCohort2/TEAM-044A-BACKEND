"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usersFactory = _interopRequireDefault(require("./usersFactory"));

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeUser = (0, _usersFactory.default)({
  upperFirst: _utils.upperFirst,
  makeSource: _utils.makeSource,
  isValidEmail: _utils.isValidEmail,
  isValidPassword: _utils.isValidPassword
});
var _default = makeUser;
exports.default = _default;