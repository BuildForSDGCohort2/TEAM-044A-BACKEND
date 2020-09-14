"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeAcceptanceEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  transactionEmailTemplate
}) => {
  return async function sendAcceptanceEmail({
    _id,
    initiator
  }) {
    try {
      const receiver = await usersDb.findById({
        id: initiator
      });
      const transactionDetails = await transactionDb.findById({
        id: _id
      });
      const {
        transactionTitle,
        transactionDesc,
        amount,
        // reference,
        email,
        transactionStatus
      } = transactionDetails; // const transactionRef = reference

      const sender = await usersDb.findByEmail({
        email
      });
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      };
      const url = dashboardURL();
      const emailTemplate = transactionEmailTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeAcceptanceEmail;
exports.default = _default;