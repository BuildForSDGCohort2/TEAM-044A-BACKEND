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
    let {
      source = {},
      ...userInfo
    } = httpRequest.body;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];

    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer;
    }

    const user = await addUser({
      source,
      ...userInfo
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      statusCode: 201,
      data: [user],
      message: 'User created'
    });
  });
  return postUser;
};

var _default = makePostUser;
exports.default = _default;