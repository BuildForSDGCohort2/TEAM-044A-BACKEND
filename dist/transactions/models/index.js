"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transactionDb = _interopRequireDefault(require("./transactionDb"));

var _models = _interopRequireDefault(require("../../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import usersDb from '../../users/model'
const {
  User,
  Transaction,
  Escrow,
  Dispute
} = _models.default;
const transactionDb = (0, _transactionDb.default)({
  User,
  Dispute,
  Transaction,
  Escrow
});
var _default = transactionDb;
exports.default = _default;