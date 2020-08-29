"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _escrowDb = _interopRequireDefault(require("./escrowDb"));

var _models = _interopRequireDefault(require("../../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Escrow,
  User,
  Transaction
} = _models.default;
const escrowDb = (0, _escrowDb.default)({
  Escrow,
  User,
  Transaction
});
var _default = escrowDb;
exports.default = _default;