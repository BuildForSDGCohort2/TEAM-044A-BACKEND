"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = process.env.NODE_ENV === 'production' ? process.env.CLOUDAMQP_URL : 'amqp://localhost';

exports.default = _default;