"use strict";

var _transactionDb = _interopRequireDefault(require("../models/transactionDb"));

var _user = _interopRequireDefault(require("../../test/fixtures/user"));

var _transaction = _interopRequireDefault(require("../../test/fixtures/transaction"));

var _db = _interopRequireDefault(require("../../test/db"));

var _models = _interopRequireDefault(require("../../database/models"));

var _usersDb = _interopRequireDefault(require("../../users/model/usersDb"));

var _jsonwt = require("../../helpers/jsonwt");

var _deliveryComplete = _interopRequireDefault(require("./deliveryComplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Transaction,
  User,
  Escrow
} = _models.default;
(0, _db.default)('transactions');
let transactionDb;
let usersDb;
beforeAll(() => {
  usersDb = (0, _usersDb.default)({
    User,
    createToken: _jsonwt.createToken
  });
  transactionDb = (0, _transactionDb.default)({
    User,
    Transaction,
    Escrow
  });
});
describe('Deliver Status', () => {
  it('marks an order as deliverd', async () => {
    const newuser = (0, _user.default)();
    const user = await usersDb.insert(newuser);
    const newtransaction = (0, _transaction.default)({
      user: {
        id: user?.user?._id
      }
    });
    const transaction = await transactionDb.insert(newtransaction);
    const ref = transaction.reference;
    const deliveryComplete = (0, _deliveryComplete.default)({
      transactionDb,
      sendDeliveryEmail: () => {}
    });
    const found = await deliveryComplete({
      ref
    });
    expect(found.transactionStatus).toBe('Delivered');
  });
});