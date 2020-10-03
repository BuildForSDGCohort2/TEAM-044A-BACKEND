"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    firstName = (0, _requireParam.default)('First name'),
    lastName = (0, _requireParam.default)('Last name'),
    phoneNumber = (0, _requireParam.default)('Phone number'),
    email = (0, _requireParam.default)('Email'),
    transactionTitle = (0, _requireParam.default)('Transaction Title'),
    transactionDesc = (0, _requireParam.default)('Transaction Description'),
    currency = (0, _requireParam.default)('Currency'),
    inspectionPeriod = (0, _requireParam.default)('Inspection Period'),
    dueDate = (0, _requireParam.default)('Due date'),
    source = (0, _requireParam.default)('Source'),
    amount = (0, _requireParam.default)('Amount')
  } = {}) {
    if (!isValidEmail(email)) {
      throw new _errors.InvalidPropertyError('Email is invalid');
    }

    if (!isValidAmount(amount)) {
      throw new _errors.InvalidPropertyError('Amount is invalid');
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
      getEmail: () => email.toLowerCase(),
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