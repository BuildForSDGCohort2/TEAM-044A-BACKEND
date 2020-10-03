"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const AMQP_URI = process.env.NODE_ENV === 'production' ? process.env.CLOUDAMQP_URL : 'amqp://localhost';
var _default = AMQP_URI;
exports.default = _default;