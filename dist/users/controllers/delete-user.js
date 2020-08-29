"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makeDeleteUser = ({
  removeUser
}) => {
  return async function deleteUser(httpRequest) {
    try {
      const {
        id
      } = httpRequest.pathParams;
      const deleted = await removeUser({
        id
      });
      return {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        statusCode: 200,
        data: JSON.stringify(deleted)
      };
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        statusCode: 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      });
    }
  };
};

var _default = makeDeleteUser;
exports.default = _default;