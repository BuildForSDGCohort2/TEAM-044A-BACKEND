"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _faker = _interopRequireDefault(require("faker"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Id = Object.freeze({
  makeId: _mongoose.default.Types.ObjectId
});

const makeFakeUser = overrides => {
  const user = {
    firstName: _faker.default.name.firstName(),
    lastName: _faker.default.name.lastName(),
    email: _faker.default.internet.email(),
    phoneNumber: '09020491830',
    source: {
      ip: _faker.default.internet.ip(),
      browser: _faker.default.internet.userAgent(),
      referrer: _faker.default.internet.url()
    },
    dob: _faker.default.date.past(),
    username: _faker.default.name.findName(),
    password: 'Jesusisreal1234!!@',
    _id: Id.makeId(),
    initiator: Id.makeId(),
    transactions: []
  };
  return { ...user,
    ...overrides
  };
};

var _default = makeFakeUser;
exports.default = _default;