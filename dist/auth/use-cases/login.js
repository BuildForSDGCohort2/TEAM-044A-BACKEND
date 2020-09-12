"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

var _errors = require("../../helpers/errors");

var _jsonwt = require("../../helpers/jsonwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
const makeLoginUser = ({
  usersDb,
  sendTokenResponse
}) => {
  return async function loginUser(userInfo) {
    const user = (0, _factory.default)(userInfo);
    const exists = await usersDb.findByEmail({
      email: user.getEmail()
    });

    if (!exists) {
      throw new _errors.InvalidPropertyError('User does not exist.');
    }

    const password = await (0, _jsonwt.validatePassword)(user.getPassword(), exists.password);

    if (!password) {
      throw new _errors.InvalidPropertyError('Password is incorrect.');
    }

    const payload = {
      id: exists._id
    };
    return sendTokenResponse(payload);
  };
};

var _default = makeLoginUser;
exports.default = _default;