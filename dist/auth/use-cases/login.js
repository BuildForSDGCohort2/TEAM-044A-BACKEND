"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

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
      throw new Error('User does not exist.');
    }

    const payload = {
      id: exists._id
    };
    return sendTokenResponse(payload);
  };
};

var _default = makeLoginUser;
exports.default = _default;