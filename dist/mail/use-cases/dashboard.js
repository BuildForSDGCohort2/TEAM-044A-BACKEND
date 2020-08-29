"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const dashboardURL = transactionRef => `http://localhost:4000/api/v1/transactions/${transactionRef}`;

var _default = dashboardURL;
exports.default = _default;