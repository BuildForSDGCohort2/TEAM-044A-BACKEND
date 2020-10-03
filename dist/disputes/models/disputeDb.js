"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const objectId = _mongoose.Types.ObjectId;

const makeDisputeDb = ({
  Dispute,
  User
}) => {
  async function insert({
    userId,
    ...info
  }) {
    const dispute = await new Dispute({ ...info
    });
    await dispute.save();
    const user = await User.findOne({
      _id: userId
    });
    await user.disputes.addToSet(dispute);
    await user.save();
    return {
      dispute
    };
  }

  async function findAll({
    id
  }) {
    const found = await Dispute.find({
      initiatorId: id
    }).populate('transactionId');
    return found;
  }

  async function findById({
    id: _id
  }) {
    const found = Dispute.findById(objectId(_id));
    return found;
  }

  async function update({
    id: _id,
    ...changes
  }) {
    const found = await Dispute.where({
      _id
    }).updateOne({
      $set: { ...changes
      }
    });
    return found ? {
      _id,
      ...changes
    } : null;
  }

  return Object.freeze({
    insert,
    findAll,
    findById,
    update
  });
};

var _default = makeDisputeDb;
exports.default = _default;