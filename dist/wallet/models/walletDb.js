"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWalletDb;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _errors = require("../../helpers/errors");

var _logger = _interopRequireDefault(require("../../configuration/logging/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeWalletDb({
  Wallet,
  usersDb,
  WalletTransaction
}) {
  async function create({ ...walletDetails
  }) {
    const {
      userId
    } = walletDetails;
    const newWallet = new Wallet({ ...walletDetails
    });
    await newWallet.save();
    const user = await usersDb.findById({
      id: userId
    });
    user.walletId = newWallet._id;
    await user.save();
    return newWallet;
  }
  /** Wallet Transactions */


  async function deposit({ ...walletDetails
  }) {
    try {
      const {
        userId
      } = walletDetails;
      const newTransaction = await new WalletTransaction({ ...walletDetails
      });
      await newTransaction.save();
      const wallet = await Wallet.findOne({
        userId
      });
      wallet.balance += newTransaction.amount;
      wallet.walletTransactions.addToSet(newTransaction);
      await wallet.save();
      return newTransaction;
    } catch (error) {
      _logger.default.error(`An error occured: Error ${error}`);

      throw new _errors.DatabaseError(error);
    }
  }

  async function transfer({ ...walletDetails
  }) {
    const session = await _mongoose.default.startSession();

    try {
      await session.withTransaction(async () => {
        const {
          userId,
          destinationWalletId,
          amount
        } = walletDetails;
        const sender = await Wallet.findOne({
          userId
        }).session(session);
        const receiver = await Wallet.findOne({
          _id: destinationWalletId
        }).session(session);
        sender.balance -= amount;
        await sender.save({
          session
        });
        receiver.balance += amount;
        await receiver.save({
          session
        });
        const newTransfer = new WalletTransaction({ ...walletDetails
        });
        await newTransfer.save();
      });
    } catch (error) {
      _logger.default.error(`An error occured: Error ${error}`);

      throw new _errors.DatabaseError(error);
    } finally {
      session.endSession();
    }
  }

  async function findByAccountId({
    id: _id
  }) {
    const found = await Wallet.findOne({
      _id
    });
    return found;
  }

  async function withdraw({ ...walletDetails
  }) {
    try {
      const {
        amount,
        userId
      } = walletDetails;
      const user = await Wallet.findOne({
        userId
      });
      user.balance -= amount;
      await user.save();
      const withdrawal = new WalletTransaction({ ...walletDetails
      });
      await withdrawal.save();
      return withdrawal;
    } catch (error) {
      throw new _errors.DatabaseError(error);
    }
  }

  return Object.freeze({
    deposit,
    create,
    transfer,
    findByAccountId,
    withdraw
  });
}