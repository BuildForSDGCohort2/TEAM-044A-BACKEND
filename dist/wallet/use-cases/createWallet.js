"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNewWallet;

var _errors = require("../../helpers/errors");

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNewWallet({
  walletDb,
  usersDb
}) {
  return async function createWallet({
    id = (0, _requireParam.default)('User Id')
  }) {
    const found = await usersDb.findById({
      id
    });

    if (!found) {
      throw new _errors.InvalidPropertyError('User does not exist.');
    }

    const {
      _id,
      email
    } = found;
    return walletDb.create({
      userId: _id,
      userEmail: email
    });
  };
}