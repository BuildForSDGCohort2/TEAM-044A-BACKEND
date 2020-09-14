"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostLogin = ({
  loginUser
}) => {
  const postLogin = (0, _tryCatchHandler.default)(async httpRequest => {
    const { ...userInfo
    } = httpRequest.body;
    const token = await loginUser({ ...userInfo
    });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 'OK',
      statusCode: 200,
      message: 'Authorized',
      data: token
    };
  });
  return postLogin;
};

var _default = makePostLogin;
exports.default = _default;