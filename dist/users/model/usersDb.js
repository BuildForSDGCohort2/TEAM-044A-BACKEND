"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
const objectId = _mongoose.default.Types.ObjectId;

const makeUsersDb = ({
  User,
  createToken,
  hashPassword
}) => {
  async function insert({ ...userInfo
  }) {
    try {
      if (userInfo.password) {
        // eslint-disable-next-line no-param-reassign
        userInfo.password = await hashPassword(userInfo.password);
      }

      const newUser = new User({ ...userInfo
      });
      const userId = {
        id: newUser._id
      };
      const token = await createToken(userId);
      const user = await newUser.save();
      return {
        user,
        token
      };
    } catch (error) {
      throw new _errors.DatabaseError(error);
    }
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
    return User.findOne({
      email
    }).select('-password').populate('transactions');
  }

  async function findById({
    id: _id
  }) {
    return User.findById(objectId(_id)).select('-password').populate('transactions').exec();
  }

  async function findAll() {
    return User.find().select('-password');
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