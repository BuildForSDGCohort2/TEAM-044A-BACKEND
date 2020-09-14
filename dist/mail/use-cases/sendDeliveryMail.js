"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("../../helpers/errors");

/* eslint-disable no-return-await */
const makeDeliveryEmail = ({
  transactionDb,
  sendMail,
  usersDb,
  dashboardURL,
  deliveryEmailTemplate
}) => {
  return async function sendDeliveryEmail({
    ref,
    initiator
  }) {
    try {
      const user = await usersDb.findById({
        id: initiator
      });
      const {
        email,
        firstName
      } = user;
      const receiver = {
        email,
        firstName
      };
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
      const emailTemplate = deliveryEmailTemplate(receiver, sender, transaction, url);
      return sendMail({
        emailTemplate
      });
    } catch (error) {
      throw new _errors.SendGridError(error.message);
    }
  };
};

var _default = makeDeliveryEmail;
exports.default = _default;