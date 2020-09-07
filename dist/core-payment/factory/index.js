"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEscrow = exports.makePayment = void 0;

var _uuid = require("uuid");

var _paymentFactory = _interopRequireDefault(require("./paymentFactory"));

var _escrowFactory = _interopRequireDefault(require("./escrowFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeEscrow = (0, _escrowFactory.default)({
  uuidv4: _uuid.v4
});
exports.makeEscrow = makeEscrow;
const makePayment = (0, _paymentFactory.default)();
exports.makePayment = makePayment;