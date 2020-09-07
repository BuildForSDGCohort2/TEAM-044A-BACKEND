"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-const */
const makePostUser = ({
  addUser
}) => {
  const postUser = (0, _tryCatchHandler.default)(async httpRequest => {
    let { ...userInfo
    } = httpRequest.body;
    let {
      source = {}
    } = httpRequest;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];

    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer;
    }

    if (typeof httpRequest.body === 'string') {
      try {
        userInfo = JSON.parse(userInfo);
      } catch {
        return (0, _httpResponse.makeHttpError)({
          statusCode: 403,
          errorMessage: 'Bad request. POST body must be valid JSON'
        });
      }
    }

    const user = await addUser({
      source,
      ...userInfo
    });
    return (0, _httpResponse.onSuccess)({
      type: 'users',
      attributes: user,
      statusCode: 201,
      self: `http://localhost:3000/api/v1/users`,
      location: `http://localhost:3000/api/v1/users`
    });
  });
  return postUser;
};

var _default = makePostUser;
exports.default = _default;