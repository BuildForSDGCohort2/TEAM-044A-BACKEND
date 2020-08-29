"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../../database/models"));

var _disputeDb = _interopRequireDefault(require("./disputeDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Dispute
} = _models.default;
const disputeDb = (0, _disputeDb.default)({
  Dispute
});
var _default = disputeDb;
exports.default = _default;