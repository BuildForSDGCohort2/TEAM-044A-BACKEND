"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostDeliveryTransaction = ({
  deliveryComplete
}) => {
  const postDeliverTransaction = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      user
    } = httpRequest;
    const {
      ref
    } = httpRequest.pathParams;
    await deliveryComplete({
      user,
      ref
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      message: 'Transaction Delivered',
      data: null,
      statusCode: 200
    });
  });
  return postDeliverTransaction;
};

var _default = makePostDeliveryTransaction;
exports.default = _default;