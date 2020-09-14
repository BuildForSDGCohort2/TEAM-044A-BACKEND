"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeGetUser = ({
  listUser
}) => {
  const getUser = (0, _tryCatchHandler.default)(async httpRequest => {
    const user = await listUser({
      id: httpRequest.user.id
    });
    return (0, _httpResponse.apiResponse)({
      status: 'OK',
      statusCode: 200,
      message: 'Authorized',
      data: [user]
    });
  });
  return getUser;
};

var _default = makeGetUser;
exports.default = _default;