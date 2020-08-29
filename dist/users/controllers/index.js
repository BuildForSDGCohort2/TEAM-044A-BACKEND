"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchUser = exports.deleteUser = exports.postUser = void 0;

var _postUser = _interopRequireDefault(require("./post-user"));

var _deleteUser = _interopRequireDefault(require("./delete-user"));

var _patchUser = _interopRequireDefault(require("./patch-user"));

var _useCases = require("../use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postUser = (0, _postUser.default)({
  addUser: _useCases.addUser
});
exports.postUser = postUser;
const deleteUser = (0, _deleteUser.default)({
  removeUser: _useCases.removeUser
});
exports.deleteUser = deleteUser;
const patchUser = (0, _patchUser.default)({
  editUser: _useCases.editUser
});
exports.patchUser = patchUser;