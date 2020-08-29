"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-param-reassign */

/* eslint-disable no-return-assign */
const buildMakeTransactionFactory = ({
  makeSource,
  isValidAmount,
  isValidEmail,
  uuidv4,
  upperFirst,
  moment
}) => {
  return function makeTransaction({
    firstName,
    lastName,
    phoneNumber,
    email,
    transactionTitle,
    transactionDesc,
    currency,
    inspectionPeriod,
    dueDate,
    source,
    amount
  } = {}) {
    if (!firstName) {
      throw new Error("Receiver's First name is required.");
    }

    if (!lastName) {
      throw new Error("Receiver's Last name is required.");
    }

    if (!phoneNumber) {
      throw new Error("Receiver's Phone number is required.");
    }

    if (!email) {
      throw new Error("Receiver's Email is required.");
    }

    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email.');
    }

    if (!transactionTitle) {
      throw new Error('Transaction title is required.');
    }

    if (!transactionDesc) {
      throw new Error('You must provide a transaction description');
    }

    if (!currency) {
      throw new Error('Please enter currency.');
    }

    if (!inspectionPeriod) {
      throw new Error('Please specify the inspection period.');
    }

    if (!dueDate) {
      throw new Error('Please specify a due date.');
    }

    if (!source) {
      throw new Error('Buyer must have a valid source.');
    }

    if (!amount) {
      throw new Error('Please enter the amount to be transferred.');
    }

    if (!isValidAmount(amount)) {
      throw new Error('Please enter a valid amount');
    }

    let reference;
    const validSource = makeSource(source);
    const validInspectionPeriod = moment().add(inspectionPeriod, 'days').valueOf();
    const validDueDate = moment(dueDate).valueOf();

    function makeReference() {
      return uuidv4();
    }

    return Object.freeze({
      getFirstName: () => upperFirst(firstName),
      getLastName: () => upperFirst(lastName),
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email,
      getTitle: () => upperFirst(transactionTitle),
      getDesc: () => transactionDesc,
      getCurrency: () => currency,
      getInspectionPeriod: () => validInspectionPeriod,
      getDueDate: () => validDueDate,
      getSource: () => validSource,
      getAmount: () => amount * 100,
      getRef: () => reference || (reference = makeReference())
    });
  };
};

var _default = buildMakeTransactionFactory;
exports.default = _default;