"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeSendDisputeMail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  disputeMailTemplate
}) => {
  return async function sendDisputeMail({
    transactionId
  }) {
    try {
      const receiver = await transactionDb.findById({
        id: transactionId
      });
      const {
        initiator,
        transactionTitle,
        transactionDesc,
        amount,
        reference,
        email,
        transactionStatus
      } = receiver;
      const sender = await usersDb.findById({
        id: initiator._id
      });
      const url = dashboardURL(reference);
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        email,
        transactionStatus
      };
      const emailTemplate = disputeMailTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeSendDisputeMail;
exports.default = _default;