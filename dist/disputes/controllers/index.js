"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisputes = exports.patchDispute = exports.postDispute = void 0;

var _postDispute = _interopRequireDefault(require("./postDispute"));

var _patchDispute = _interopRequireDefault(require("./patchDispute"));

var _getDisputes = _interopRequireDefault(require("./getDisputes"));

var _useCases = require("../use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postDispute = (0, _postDispute.default)({
  addDispute: _useCases.addDispute
});
exports.postDispute = postDispute;
const patchDispute = (0, _patchDispute.default)({
  editDispute: _useCases.editDispute
});
exports.patchDispute = patchDispute;
const getDisputes = (0, _getDisputes.default)({
  listDisputes: _useCases.listDisputes
});
exports.getDisputes = getDisputes;