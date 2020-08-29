"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-return-await */
const objectId = _mongoose.default.Types.ObjectId;

const makeUsersDb = ({
  User,
  createToken
}) => {
  async function insert({ ...userInfo
  }) {
    const user = await new User({ ...userInfo
    });
    const userId = {
      id: user._id
    };
    const token = await createToken(userId);
    await user.save();
    return {
      user,
      token
    };
  }

  async function update({
    id: _id,
    ...changes
  }) {
    const result = await User.where({
      _id
    }).updateOne({
      $set: { ...changes
      }
    }).exec();
    return result.nModified > 0 ? {
      _id,
      ...changes
    } : null;
  }

  async function findByEmail({
    email
  }) {
    return await User.findOne({
      email
    }).populate('transactions');
  }

  async function findById({
    id: _id
  }) {
    return await User.findById(objectId(_id)).populate('transactions').exec();
  }

  async function findAll() {
    return await User.find();
  }

  return Object.freeze({
    insert,
    update,
    findByEmail,
    findById,
    findAll
  });
};

var _default = makeUsersDb;
exports.default = _default;