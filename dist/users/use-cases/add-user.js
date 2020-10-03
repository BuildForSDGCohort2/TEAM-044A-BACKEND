"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

var _errors = require("../../helpers/errors");

var _publisher = _interopRequireDefault(require("../../pubsub/publisher"));

var _subscriber = _interopRequireDefault(require("../../pubsub/subscriber"));

var _mail = require("../../mail");

var _useCases = require("../../wallet/use-cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeAddUser = ({
  usersDb,
  transactionsDb
}) => {
  return async function addUser(userInfo) {
    const user = (0, _factory.default)(userInfo);
    const exists = await usersDb.findByEmail({
      email: user.getEmail()
    });

    if (exists) {
      throw new _errors.UniqueConstraintError('Email address');
    }

    const userSource = user.getSource();
    const newUser = await usersDb.insert({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword(),
      dob: user.getDOB(),
      username: user.getUsername(),
      createdOn: user.getCreatedOn(),
      modifiedOn: user.getModifiedOn(),
      source: {
        ip: userSource.getIp(),
        browser: userSource.getBrowser(),
        referrer: userSource.getReferrer()
      }
    });
    const id = newUser.user._id;
    await transactionsDb.findMyTransactions(user.getEmail());
    await (0, _useCases.createWallet)({
      id
    });
    await (0, _publisher.default)(id.toString(), 'newuser.verify');
    await (0, _subscriber.default)('verify_queue', _mail.verifyUser, '*.verify');
    return newUser;
  };
};

var _default = makeAddUser;
exports.default = _default;