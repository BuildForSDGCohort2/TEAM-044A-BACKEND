"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _errors = require("../helpers/errors");

var _tryCatchHandler = _interopRequireDefault(require("../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
_dotenv.default.config();

const decodeToken = controller => {
  const sendToken = (0, _tryCatchHandler.default)(async httpRequest => {
    const token = httpRequest.headers['x-auth-token'];

    if (!token) {
      throw new _errors.UnauthorizedError('No token, authorization denied.');
    }

    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new _errors.InvalidPropertyError('No User with this token exists.');
    }

    httpRequest.user = decoded;
    return controller(httpRequest);
  });
  return sendToken;
};

var _default = decodeToken;
exports.default = _default;