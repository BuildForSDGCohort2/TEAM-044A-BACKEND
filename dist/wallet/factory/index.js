"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _walletFactory = _interopRequireDefault(require("./walletFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeWallet = (0, _walletFactory.default)({
  uuidv4: _uuid.v4
});
var _default = makeWallet;
exports.default = _default;