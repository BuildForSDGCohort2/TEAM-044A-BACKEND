"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.disburse = void 0;

var _events = require("events");

var _cron = require("cron");

var _models = _interopRequireDefault(require("../core-payment/models"));

var _models2 = _interopRequireDefault(require("../transactions/models"));

var _model = _interopRequireDefault(require("../users/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-classes-per-file */
class DisbursementAPI extends _events.EventEmitter {
  constructor() {
    super();
  }

  async releaseFunds({
    transactionID
  }) {
    // get the transaction that is === the transactionID
    const transaction = await _models.default.findEscrow({
      transactionID
    });
    const {
      totalAmount,
      transactionId,
      escrowCharge,
      _id,
      isCustomerPaid
    } = transaction;
    const currentTransaction = await _models2.default.findById({
      id: transactionId
    });
    const {
      email,
      inspectionPeriod
    } = currentTransaction;
    const receiver = await _model.default.findByEmail({
      email
    }); // checks to see if the customer's money has been disbursed before now

    if (isCustomerPaid) {
      throw new Error('The recipient money has been disbursed already.');
    } else if (inspectionPeriod === Date.now()) {
      await _models.default.transferMoney({
        totalAmount,
        transactionId,
        escrowCharge,
        receiver
      }).then(async () => {
        const result = await _models.default.update({
          id: _id,
          isCustomerPaid: true
        });
        return result;
      });
    } else {
      runCron(new Date(inspectionPeriod), totalAmount, transactionId, escrowCharge, receiver, _id);
    }

    this.emit('transferMoney', transactionId);
    return this;
  }

}

function runCron(inspectionPeriod, totalAmount, transactionId, escrowCharge, receiver, _id) {
  // Setup a cron job that will hold this information and run when the inspectionPeriod is over
  const job = new _cron.CronJob(inspectionPeriod, async () => {
    await _models.default.transferMoney({
      totalAmount,
      transactionId,
      escrowCharge,
      receiver
    });
    await _models.default.update({
      id: _id,
      isCustomerPaid: true
    });
  });
  return job.start();
}

const disburse = async msg => {
  // get the transaction that is === the transactionID
  const transaction = await _models.default.findEscrow({
    msg
  });
  const {
    totalAmount,
    transactionId,
    escrowCharge,
    _id,
    isCustomerPaid
  } = transaction;
  const currentTransaction = await _models2.default.findById({
    id: transactionId
  });
  const {
    email
  } = currentTransaction;
  let {
    inspectionPeriod
  } = currentTransaction;
  const receiver = await _model.default.findByEmail({
    email
  });
  inspectionPeriod = Date.now(); // checks to see if the customer's money has been disbursed before now

  if (isCustomerPaid) {
    throw new Error('The recipient money has been disbursed already.');
  } else if (inspectionPeriod === Date.now()) {
    await _models.default.transferMoney({
      totalAmount,
      transactionId,
      escrowCharge,
      receiver
    }).then(async () => {
      const result = await _models.default.update({
        id: _id,
        isCustomerPaid: true
      });
      return result;
    });
  }
};

exports.disburse = disburse;
var _default = DisbursementAPI;
exports.default = _default;