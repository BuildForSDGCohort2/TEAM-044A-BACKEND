"use strict";

var _transactionModel = _interopRequireDefault(require("./transactionModel"));

var _db = _interopRequireDefault(require("../../test/db"));

var _transactionDb = _interopRequireDefault(require("./transactionDb"));

var _transaction = _interopRequireDefault(require("../../test/fixtures/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
(0, _db.default)('transactions');
let transactionDb;
beforeAll(() => {
  transactionDb = (0, _transactionDb.default)({
    Transaction: _transactionModel.default
  });
});
describe.skip('Transactions Db', () => {
  it('adds a transaction', async () => {
    const transaction = (0, _transaction.default)();
    const toInsert = await transactionDb.insert(transaction);
    expect(toInsert).toEqual(transaction);
  });
  it('finds a transaction by id', async () => {
    const transaction = (0, _transaction.default)();
    await transactionDb.insert(transaction);
    const found = await transactionDb.findById(transaction);
    expect(found).not.toBeNull();
  });
  it('removes a transaction', async () => {
    const transaction = (0, _transaction.default)();
    await transactionDb.insert(transaction);
    const found = await transactionDb.findById(transaction);
    expect(found).not.toBeNull();
    const toRemove = await transactionDb.remove(found);
    expect(toRemove).toBeNull();
  });
  it('updates a transaction', async () => {
    const transaction = (0, _transaction.default)();
    await transactionDb.insert(transaction);
    transaction.firstName = 'King iyosayi';
    expect(transaction.firstName).toBe('King iyosayi');
  });
});