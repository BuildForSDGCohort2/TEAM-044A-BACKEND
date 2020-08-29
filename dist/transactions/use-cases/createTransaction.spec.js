"use strict";

var _createTransaction = _interopRequireDefault(require("./createTransaction"));

var _transactionDb = _interopRequireDefault(require("../models/transactionDb"));

var _transactionModel = _interopRequireDefault(require("../models/transactionModel"));

var _transaction = _interopRequireDefault(require("../../test/fixtures/transaction"));

var _user = _interopRequireDefault(require("../../test/fixtures/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

/* eslint-disable no-undef */
let transactionDb;
beforeAll(() => {
  transactionDb = (0, _transactionDb.default)({
    Transaction: _transactionModel.default
  });
});
jest.mock('./createTransaction.js');
const createTransaction = jest.fn(() => {
  (0, _createTransaction.default)({
    transactionDb,
    sendTransactionMail: () => console.log('DONE!!!123')
  });
});
describe('Create Transaction', () => {
  it('adds a transaction to the db', async () => {
    const transactionInfo = (0, _transaction.default)();
    const user = (0, _user.default)();
    createTransaction({
      user,
      ...transactionInfo
    });
    createTransaction.mockImplementation(() => transactionInfo);
    expect(createTransaction({
      user,
      ...transactionInfo
    })).toBeTruthy();
  });
});