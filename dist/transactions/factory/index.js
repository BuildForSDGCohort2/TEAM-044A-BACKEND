"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../../helpers/utils");

var _transactionFactory = _interopRequireDefault(require("./transactionFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeTransaction = (0, _transactionFactory.default)({
  makeSource: _utils.makeSource,
  upperFirst: _utils.upperFirst,
  uuidv4: _uuid.v4,
  isValidAmount: _utils.isValidAmount,
  isValidEmail: _utils.isValidEmail,
  moment: _moment.default
});
var _default = makeTransaction;
exports.default = _default;