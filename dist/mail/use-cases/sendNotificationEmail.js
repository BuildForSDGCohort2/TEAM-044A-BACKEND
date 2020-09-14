"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeSendNotificationEmail = ({
  transactionDb,
  sendMail,
  dashboardURL,
  acceptanceEmailTemplate
}) => {
  return async function sendNotificationEmail({
    ref,
    user
  }) {
    try {
      const receiver = await transactionDb.findByRef({
        ref
      }); // const transactionRef = receiver.reference

      const {
        transactionStatus,
        transactionTitle,
        transactionDesc,
        amount
      } = receiver;
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      };
      const url = dashboardURL();
      const emailTemplate = acceptanceEmailTemplate(receiver, user, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeSendNotificationEmail;
exports.default = _default;