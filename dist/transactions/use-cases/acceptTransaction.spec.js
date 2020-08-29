"use strict";

var _transactionDb = _interopRequireDefault(require("../models/transactionDb"));

var _transaction = _interopRequireDefault(require("../../test/fixtures/transaction"));

var _user = _interopRequireDefault(require("../../test/fixtures/user"));

var _db = _interopRequireDefault(require("../../test/db"));

var _models = _interopRequireDefault(require("../../database/models"));

var _acceptTransaction = _interopRequireDefault(require("./acceptTransaction"));

var _usersDb = _interopRequireDefault(require("../../users/model/usersDb"));

var _jsonwt = require("../../helpers/jsonwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
const {
  Transaction,
  User,
  Escrow
} = _models.default;
(0, _db.default)('transactions');
let transactionDb;
let usersDb;
beforeAll(() => {
  transactionDb = (0, _transactionDb.default)({
    Transaction,
    User,
    Escrow
  });
  usersDb = (0, _usersDb.default)({
    User,
    createToken: _jsonwt.createToken
  });
});
describe('Accept Transaction', () => {
  it('marks transaction status as Transaction Accepted - Not funded', async () => {
    const newuser = (0, _user.default)();
    const user = await usersDb.insert(newuser);
    const newtransaction = (0, _transaction.default)({
      user: {
        id: user?.user?._id
      }
    });
    const transaction = await transactionDb.insert(newtransaction);
    const acceptTransaction = (0, _acceptTransaction.default)({
      transactionDb,
      sendAcceptanceEmail: () => {}
    });
    const found = await acceptTransaction({
      ref: transaction.reference
    });
    expect(found.transactionStatus).toBe('Transaction Accepted - Not funded');
  });
});