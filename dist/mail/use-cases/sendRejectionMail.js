"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeRejectionEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  rejectionEmailTemplate
}) => {
  return async function sendRejectionEmail({
    ref,
    user
  }) {
    try {
      const receiver = await usersDb.findById({
        id: user.id
      });
      const sender = await transactionDb.findByRef({
        ref
      });
      const transactionRef = sender.reference;
      const {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      } = sender;
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      };
      const url = dashboardURL(transactionRef);
      const emailTemplate = rejectionEmailTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeRejectionEmail;
exports.default = _default;