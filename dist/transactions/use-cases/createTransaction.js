"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeBuildCreateTransaction = ({
  transactionDb,
  sendTransactionMail
}) => {
  return async function createTransaction({
    user,
    ...transactionInfo
  } = {}) {
    const {
      id
    } = user;
    const transaction = (0, _factory.default)({ ...transactionInfo
    });
    const transactionSource = transaction.getSource();
    const newTransaction = await transactionDb.insert({
      firstName: transaction.getFirstName(),
      lastName: transaction.getLastName(),
      phoneNumber: transaction.getPhoneNumber(),
      email: transaction.getEmail(),
      transactionTitle: transaction.getTitle(),
      transactionDesc: transaction.getDesc(),
      currency: transaction.getCurrency(),
      amount: transaction.getAmount(),
      inspectionPeriod: transaction.getInspectionPeriod(),
      dueDate: transaction.getDueDate(),
      reference: transaction.getRef(),
      initiator: id,
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser(),
        referrer: transactionSource.getReferrer()
      },
      user
    });
    await sendTransactionMail({
      newTransaction,
      user
    });
    return newTransaction;
  };
};

var _default = makeBuildCreateTransaction;
exports.default = _default;