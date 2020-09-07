"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

var _errors = require("../../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeAddUser = ({
  usersDb
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
    return usersDb.insert({
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
  };
};

var _default = makeAddUser;
exports.default = _default;