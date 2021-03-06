"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requireParam = _interopRequireDefault(require("../../helpers/requireParam"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeListUser = ({
  usersDb,
  transactionsDb
}) => {
  return async function listUser({
    id = (0, _requireParam.default)('Id')
  } = {}) {
    const user = await usersDb.findById({
      id
    });

    if (!user) {
      throw new _errors.InvalidPropertyError('User does not exist.');
    }

    const {
      email
    } = user;
    return transactionsDb.findMyTransactions(email);
  };
};

var _default = makeListUser;
exports.default = _default;