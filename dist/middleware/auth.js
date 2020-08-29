"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _httpResponse = require("../helpers/http-response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
_dotenv.default.config();

const decodeToken = controller => {
  return async function sendToken(httpRequest) {
    const token = httpRequest.headers['x-auth-token'];

    try {
      if (!token) {
        return (0, _httpResponse.makeHttpError)({
          statusCode: 401,
          title: 'Unauthorized',
          errorMessage: 'No token, authorization denied.'
        });
      }

      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

      httpRequest.user = decoded;
      return controller(httpRequest);
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        statusCode: error.statusCode || 401,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      });
    }
  };
};

var _default = decodeToken;
exports.default = _default;