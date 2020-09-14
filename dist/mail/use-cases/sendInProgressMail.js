"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeInProgressEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  inProgressEmailTemplate
}) => {
  return async function sendInProgressMail({
    ref,
    initiator
  }) {
    try {
      /**
       * The initiator of the transaction is meant to get the email stating the recipient is delivering the product or service.
       * The initiator in this case is the incoming user object.
       */
      const receiver = await usersDb.findById({
        id: initiator
      });
      const transactionDetails = await transactionDb.findByRef({
        ref
      });
      const {
        email
      } = transactionDetails; // const transactionRef = transactionDetails.reference

      const sender = await usersDb.findByEmail({
        email
      });
      const {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      } = transactionDetails;
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      };
      const url = dashboardURL();
      const emailTemplate = inProgressEmailTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeInProgressEmail;
exports.default = _default;