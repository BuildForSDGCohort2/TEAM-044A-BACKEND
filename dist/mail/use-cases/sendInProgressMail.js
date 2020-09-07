"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
      } = transactionDetails;
      const transactionRef = transactionDetails.reference;
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
      const url = dashboardURL(transactionRef);
      const emailTemplate = inProgressEmailTemplate(receiver, sender, transaction, url);
      return await sendMail({
        emailTemplate
      });
    } catch (error) {
      throw error;
    }
  };
};

var _default = makeInProgressEmail;
exports.default = _default;