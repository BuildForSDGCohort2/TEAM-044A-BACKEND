"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable consistent-return */

/* eslint-disable no-useless-catch */

/* eslint-disable no-console */
const buildMakeSendTransaction = ({
  transactionDb,
  usersDb,
  sendMail,
  createToken,
  getTransactionEmailURL,
  createTransactionTemplate
}) => {
  return async function sendTransactionMail({
    newTransaction,
    user
  }) {
    try {
      const sender = await usersDb.findById({
        id: user.id
      });
      const receiver = await transactionDb.findById({
        id: newTransaction._id
      });
      const toSend = {
        id: receiver._id,
        email: receiver.email,
        emailVerified: receiver.emailVerified
      };
      const transactionRef = createToken(toSend);
      const {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      } = receiver;
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      };
      const url = getTransactionEmailURL(transactionRef);
      const emailTemplate = createTransactionTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      console.log(error);
    }
  };
};

var _default = buildMakeSendTransaction;
exports.default = _default;