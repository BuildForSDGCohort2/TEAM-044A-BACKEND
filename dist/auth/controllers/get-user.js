"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makeGetUser = ({
  listUser
}) => {
  return async function getUser(httpRequest) {
    try {
      const user = await listUser({
        id: httpRequest.user.id
      });
      return (0, _httpResponse.onSuccess)({
        type: 'user',
        attributes: user,
        statusCode: 200,
        self: `http://localhost:4000/api/v1/users`
      });
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        title: error.name,
        errorMessage: error.message,
        statusCode: error.statusCode || 400,
        stack: error.stack
      });
    }
  };
};

var _default = makeGetUser;
exports.default = _default;