"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTransaction = exports.createTransaction = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _request = _interopRequireDefault(require("request"));

var _index = _interopRequireDefault(require("../models/index"));

var _models = _interopRequireDefault(require("../../core-payment/models"));

var _mail = require("../../mail");

var _factory = require("../../core-payment/factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  initializePayment,
  verifyPayment
} = require('../../paystack/paystack')(_request.default);

const createTransaction = async (req, res) => {
  try {
    const {
      ref
    } = req.params;
    const currentTransaction = await _index.default.findByRef({
      ref
    });
    const {
      amount,
      email
    } = currentTransaction;
    const amountToPay = amount * 0.025 + amount;
    const order = {
      email,
      amount: amountToPay,
      reference: ref
    };
    initializePayment(order, (error, body) => {
      if (error) {
        return res.status(400).json({
          title: error.name,
          message: error.message,
          stack: error.stack
        });
      }

      const response = JSON.parse(body);
      console.log(response);
      res.redirect(response.data.authorization_url);
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      title: error.name,
      stack: error.stack
    });
    process.exit(0);
  }
};

exports.createTransaction = createTransaction;

const verifyTransaction = (req, res) => {
  try {
    const ref = req.query.reference;
    const buyerId = req.user._id;
    const {
      user
    } = req;
    verifyPayment(ref, async (error, body) => {
      if (error) {
        res.status(400).json({
          title: error.name,
          message: error.message,
          stack: error.stack
        });
      }

      const response = JSON.parse(body);

      const data = _lodash.default.at(response.data, ['reference', 'amount']);

      const [reference, totalAmount] = data;
      const found = await _index.default.findByRef({
        ref
      });
      const depositedFund = (0, _factory.makeEscrow)({
        totalAmount,
        reference,
        buyerId
      });
      const payment = {
        totalAmount: depositedFund.getAmount(),
        reference: depositedFund.getReference(),
        buyerId: depositedFund.getBuyerId(),
        escrowCharge: depositedFund.getEscrowCharge(),
        transactionId: found._id,
        isPaid: true
      };
      await Promise.all([_models.default.deposit(payment), _index.default.update({
        id: found._id,
        transactionStatus: 'Accepted and Funded'
      }), (0, _mail.sendNotificationEmail)({
        ref,
        user
      })]);
      return res.status(200).json({
        status: true,
        message: 'Success',
        data: {
          payment
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      title: error.name,
      message: error.name,
      stack: error.stack
    });
  }
};

exports.verifyTransaction = verifyTransaction;