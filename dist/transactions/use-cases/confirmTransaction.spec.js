"use strict";

var _db = _interopRequireDefault(require("../../test/db"));

var _confirmTransaction = _interopRequireDefault(require("./confirmTransaction"));

var _transaction = _interopRequireDefault(require("../../test/fixtures/transaction"));

var _transactionDb = _interopRequireDefault(require("../models/transactionDb"));

var _user = _interopRequireDefault(require("../../test/fixtures/user"));

var _models = _interopRequireDefault(require("../../database/models"));

var _usersDb = _interopRequireDefault(require("../../users/model/usersDb"));

var _jsonwt = require("../../helpers/jsonwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { sendConfirmEmail } from '../../mail/index'
const {
  Transaction,
  User,
  Escrow
} = _models.default;
jest.setTimeout(30000);
(0, _db.default)('escrow-test');
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
describe('Confirms a transaction', () => {
  it('marks transaction as confirmed', async () => {
    const newuser = (0, _user.default)();
    const user = await usersDb.insert(newuser);
    const transactions = (0, _transaction.default)({
      user: {
        id: user?.user?._id
      }
    });
    const inserted = await transactionDb.insert(transactions);
    const ref = inserted.reference;
    const confirmTransaction = (0, _confirmTransaction.default)({
      transactionDb,
      sendConfirmEmail: () => {}
    });
    const found = await confirmTransaction({
      ref
    });
    expect(found.transactionStatus).toBe('Buyer confirmed Order');
  });
});