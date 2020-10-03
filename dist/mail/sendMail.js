"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
_dotenv.default.config();

_mail.default.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({
  emailTemplate
}) => {
  try {
    return await _mail.default.send(emailTemplate);
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

var _default = sendMail;
exports.default = _default;