"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _faker = _interopRequireDefault(require("faker"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Id = Object.freeze({
  makeId: _mongoose.default.Types.ObjectId
});

const makeFakeTransaction = overrides => {
  const transaction = {
    firstName: _faker.default.name.firstName(),
    lastName: _faker.default.name.lastName(),
    email: _faker.default.internet.email(),
    phoneNumber: _faker.default.phone.phoneNumber(),
    transactionTitle: _faker.default.commerce.productName(),
    transactionDesc: _faker.default.commerce.productAdjective(),
    currency: 'Naira',
    inspectionPeriod: 2,
    dueDate: _faker.default.date.future(),
    transactionStatus: 'Awaiting Confirmation',
    reference: (0, _uuid.v4)(),
    amount: 3000,
    source: {
      ip: _faker.default.internet.ip(),
      browser: _faker.default.internet.userAgent(),
      referrer: _faker.default.internet.url()
    },
    // user: {
    //   id: Id.makeId()
    // },
    initiator: '5f2bb93768a73f458c1db215',
    _id: '5f2bbad770427348f84dbcf0'
  };
  return { ...transaction,
    ...overrides
  };
};

var _default = makeFakeTransaction;
exports.default = _default;