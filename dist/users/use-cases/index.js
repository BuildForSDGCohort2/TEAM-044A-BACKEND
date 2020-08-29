"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listUser = exports.removeUser = exports.editUser = exports.addUser = void 0;

var _addUser = _interopRequireDefault(require("./add-user"));

var _editUser = _interopRequireDefault(require("./edit-user"));

var _removeUser = _interopRequireDefault(require("./remove-user"));

var _listUser = _interopRequireDefault(require("./list-user"));

var _model = _interopRequireDefault(require("../model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addUser = (0, _addUser.default)({
  usersDb: _model.default
});
exports.addUser = addUser;
const editUser = (0, _editUser.default)({
  usersDb: _model.default
});
exports.editUser = editUser;
const removeUser = (0, _removeUser.default)({
  usersDb: _model.default
});
exports.removeUser = removeUser;
const listUser = (0, _listUser.default)({
  usersDb: _model.default
});
exports.listUser = listUser;