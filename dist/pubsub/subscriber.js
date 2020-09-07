"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subscriber;

var _callback_api = _interopRequireDefault(require("amqplib/callback_api"));

var _events = require("./events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
const url = process.env.CLOUDAMQP_URL || 'amqp://localhost';

function subscriber() {
  _callback_api.default.connect(url, (err, conn) => {
    conn.createChannel((error, channel) => {
      if (error) {
        console.log(`An error occured ${error}`);
      }

      const exchange = 'escrow';
      const queue = 'disburse';
      channel.assertExchange(exchange, 'direct', {
        durable: true
      });
      channel.assertQueue(queue, {
        durable: true
      });
      channel.bindQueue(queue, exchange, 'disbursement');
      channel.consume(queue, async msg => {
        await (0, _events.disburse)(msg.content.toString());
        channel.ack(msg);
      }, {
        noAck: false
      });
    });
  });
}