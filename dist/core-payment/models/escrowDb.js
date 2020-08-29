"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-return-await */
const objectId = _mongoose.default.Types.ObjectId;

const makeEscrowDb = ({
  Escrow,
  User,
  Transaction
}) => {
  async function findById({
    id: _id
  }) {
    return await Escrow.findById(objectId(_id));
  }

  async function findByRef({
    ref
  }) {
    return await Escrow.findOne({
      reference: ref
    });
  }

  async function transferMoney({
    referenceId,
    receiverId,
    amount
  }) {
    const session = await _mongoose.default.startSession();
    session.startTransaction();

    try {
      const currentTransaction = await Escrow.findOne({
        reference: referenceId
      }).session(session);
      currentTransaction.amount -= amount;
      await currentTransaction.save({
        session
      });
      const receiver = await User.findOne({
        _id: receiverId
      });
      receiver.balance += amount;
      await receiver.save({
        session
      });
      const completedTransaction = await Transaction.findOne({
        reference: referenceId
      });
      completedTransaction.transactionStatus = 'Completed';
      await completedTransaction.save({
        session
      });
      await session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
    } finally {
      session.endSession();
    }
  }

  async function handleMoneyTransfer({
    referenceId,
    receiverId,
    amount
  }) {
    const session = await _mongoose.default.startSession();

    try {
      await session.withTransaction(async () => {
        const currentTransaction = await Escrow.findOne({
          reference: referenceId
        }).session(session);
        currentTransaction.amount -= amount;
        await currentTransaction.save({
          session
        });
        const receiver = await User.findOne({
          _id: receiverId
        });
        receiver.balance += amount;
        await receiver.save({
          session
        });
        const completedTransaction = await Transaction.findOne({
          reference: referenceId
        });
        completedTransaction.transactionStatus = 'Completed';
        await completedTransaction.save({
          session
        });
      });
    } finally {
      session.endSession();
    }
  }

  async function deposit({ ...paymentDetails
  }) {
    const session = await _mongoose.default.startSession();

    try {
      await session.withTransaction(async () => {
        const newEscrow = await new Escrow({ ...paymentDetails
        });
        await newEscrow.save({
          session
        });
      });
    } finally {
      session.endSession();
    }
  }

  async function findAll() {
    return await Escrow.find().populate('currentTransaction').populate('sellerInfo').exec();
  }

  return Object.freeze({
    findById,
    findByRef,
    transferMoney,
    findAll,
    handleMoneyTransfer,
    deposit
  });
};

var _default = makeEscrowDb;
exports.default = _default;