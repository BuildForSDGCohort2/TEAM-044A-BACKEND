"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = publishToQueue;

var _callback_api = _interopRequireDefault(require("amqplib/callback_api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
let ch = null;
const url = process.env.CLOUDAMQP_URL || 'amqp://localhost';

_callback_api.default.connect(url, (err, conn) => {
  conn.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    const exchange = 'escrow';
    ch = channel;
    channel.assertExchange(exchange, 'direct', {
      durable: true
    });
  });
});

async function publishToQueue(exchange, routingKey, data) {
  return ch.publish(exchange, routingKey, Buffer.from(data));
}