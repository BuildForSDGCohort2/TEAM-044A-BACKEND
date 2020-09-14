"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

const makeConfirmEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  confirmEmailTemplate
}) => {
  return async function sendConfirmEmail({
    ref,
    initiator
  }) {
    try {
      const sender = await usersDb.findById({
        id: initiator
      });
      const receiver = await transactionDb.findByRef({
        ref
      }); // const transactionRef = receiver.reference

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
      const url = dashboardURL();
      const emailTemplate = confirmEmailTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeConfirmEmail;
exports.default = _default;