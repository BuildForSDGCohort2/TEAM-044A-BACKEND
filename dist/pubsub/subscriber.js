"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _amqplib = _interopRequireDefault(require("amqplib"));

var _config = _interopRequireDefault(require("../helpers/config"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assertQueueOptions = {
  durable: true
};
const assertExchangeOptions = {
  durable: true
};
const consumeQueueOptions = {
  noAck: false
};
const exchange = 'escrow';

const consumer = async (queue, func, key) => {
  try {
    const conn = await _amqplib.default.connect(_config.default);
    const channel = await conn.createChannel();
    await channel.assertExchange(exchange, 'topic', assertExchangeOptions);
    await channel.assertQueue(queue, assertQueueOptions);
    await channel.bindQueue(queue, exchange, key);
    await channel.consume(queue, msg => {
      func(msg.content.toString());
      channel.ack(msg);
    }, consumeQueueOptions);
    return channel;
  } catch (error) {
    throw new _errors.MessageBrokerError(error.message);
  }
};

var _default = consumer;
exports.default = _default;