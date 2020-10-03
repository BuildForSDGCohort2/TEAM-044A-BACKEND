"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _amqplib = _interopRequireDefault(require("amqplib"));

var _config = _interopRequireDefault(require("../helpers/config"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exchange = 'escrow';
const assertExchangeOptions = {
  durable: true
};

const publisher = async (data, routingKey) => {
  try {
    const conn = await _amqplib.default.connect(_config.default);
    const channel = await conn.createChannel();
    await channel.assertExchange(exchange, 'topic', assertExchangeOptions);
    return channel.publish(exchange, routingKey, Buffer.from(data));
  } catch (error) {
    throw new _errors.MessageBrokerError(error.message);
  }
};

var _default = publisher;
exports.default = _default;