"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostInProgress = ({
  inProgress
}) => {
  const postInProgress = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      user
    } = httpRequest;
    const {
      ref
    } = httpRequest.pathParams;
    await inProgress({
      user,
      ref
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      message: 'Transaction in Progress',
      statusCode: 200,
      data: null
    });
  });
  return postInProgress;
};

var _default = makePostInProgress;
exports.default = _default;