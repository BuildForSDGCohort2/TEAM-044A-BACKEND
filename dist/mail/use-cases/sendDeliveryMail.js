"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    return await sendMail({
      emailTemplate
    });
  };
};

var _default = makeDeliveryEmail;
exports.default = _default;