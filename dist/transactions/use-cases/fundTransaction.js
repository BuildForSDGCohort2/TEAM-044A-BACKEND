"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTransaction = exports.createTransaction = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _httpResponse = require("../../helpers/http-response");

var _index = _interopRequireDefault(require("../../transactions/models/index"));

var _request = _interopRequireDefault(require("request"));

var _models = _interopRequireDefault(require("../../core-payment/models"));

var _mail = require("../../mail");

var _factory = require("../../core-payment/factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * WorkFlow -------------
 * 1) Signup --- Done
 * 2) Create Transaction --- Done
 * 3) Recipient gets notification of pending transaction --- Done
 * 4) If recipeient isn't signed up yet, they go ahead to signup --- Done
 * 5) Once recipient signs up, he sees the pending transaction --- Done
 * 6) Reciepient can either choose to accept or reject
 * 7) If recipient chooses to accept, a notification is sent to the buyer notifying him/her
 *  that the reciepient has accepted XYZ transaction and the transaction status is changed
 *  to `Accepted- Yet to be funded`
 *  If the seller rejects the transaction, the buyer is notified and the transaction status is changed to `Seller rejects transaction`
 * 8) At this point, the buyer goes on to pay XYZ amount.
 * 9) At this point, the amount to be paid plus fees to be calculated is displayed to his screen
 * 10) He/she goes onto the payment gateway and then inputs his card details and the respective amount
 * 11) In this case - we mimick the process, How?
 * 12) The inputted amount is saved to the escrowDb that carries the buyer details, recipient details, transaction details
 * 13) At this point, the recipient is notified that the buyer has paid and the status changes to `Buyer funded Transaction`
 * 14) The recipient then goes onto deliver the product or service and the status changes to `In progress`
 * 15) If the buyer rejects the deliverd product or service, the status changes to `delivery reject` and the money is still held in escrow
 * 16)
 */
const {
  initializePayment,
  verifyPayment
} = require('../../paystack/paystack')(_request.default);

const createTransaction = async (req, res) => {
  try {
    const user = req.user;
    const ref = req.params.ref;
    const {
      transactions
    } = user;
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
      res.redirect(response.data.authorization_url);
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      title: error.name,
      stack: error.stack
    });
  }
};

exports.createTransaction = createTransaction;

const verifyTransaction = (req, res) => {
  try {
    const ref = req.query.reference;
    const buyerId = req.user._id;
    const user = req.user;
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