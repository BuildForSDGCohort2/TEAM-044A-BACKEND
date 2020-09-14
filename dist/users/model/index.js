"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usersDb = _interopRequireDefault(require("./usersDb"));

var _models = _interopRequireDefault(require("../../database/models"));

var _jsonwt = require("../../helpers/jsonwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  User
} = _models.default;
const usersDb = (0, _usersDb.default)({
  User,
  hashPassword: _jsonwt.hashPassword,
  createToken: _jsonwt.createToken
});
var _default = usersDb;
exports.default = _default;