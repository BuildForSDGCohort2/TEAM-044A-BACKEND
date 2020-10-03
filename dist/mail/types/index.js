"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  transactionEmailTemplate: true,
  rejectionEmailTemplate: true,
  acceptanceEmailTemplate: true,
  deliveryEmailTemplate: true,
  confirmEmailTemplate: true,
  inProgressEmailTemplate: true,
  deliveryRejectionTemplate: true,
  disputeMailTemplate: true
};
Object.defineProperty(exports, "transactionEmailTemplate", {
  enumerable: true,
  get: function () {
    return _acceptanceMail.default;
  }
});
Object.defineProperty(exports, "rejectionEmailTemplate", {
  enumerable: true,
  get: function () {
    return _rejectionEmail.default;
  }
});
Object.defineProperty(exports, "acceptanceEmailTemplate", {
  enumerable: true,
  get: function () {
    return _sendAcceptanceMail.default;
  }
});
Object.defineProperty(exports, "deliveryEmailTemplate", {
  enumerable: true,
  get: function () {
    return _deliveryTemplate.default;
  }
});
Object.defineProperty(exports, "confirmEmailTemplate", {
  enumerable: true,
  get: function () {
    return _confirmMailTemplate.default;
  }
});
Object.defineProperty(exports, "inProgressEmailTemplate", {
  enumerable: true,
  get: function () {
    return _inProgressTemplate.default;
  }
});
Object.defineProperty(exports, "deliveryRejectionTemplate", {
  enumerable: true,
  get: function () {
    return _deliveryRejectTemplate.default;
  }
});
Object.defineProperty(exports, "disputeMailTemplate", {
  enumerable: true,
  get: function () {
    return _disputeMailTemplate.default;
  }
});

var _acceptanceMail = _interopRequireDefault(require("./acceptanceMail"));

var _rejectionEmail = _interopRequireDefault(require("./rejectionEmail"));

var _sendAcceptanceMail = _interopRequireDefault(require("./sendAcceptanceMail"));

var _deliveryTemplate = _interopRequireDefault(require("./deliveryTemplate"));

var _confirmMailTemplate = _interopRequireDefault(require("./confirmMailTemplate"));

var _inProgressTemplate = _interopRequireDefault(require("./inProgressTemplate"));

var _deliveryRejectTemplate = _interopRequireDefault(require("./deliveryRejectTemplate"));

var _disputeMailTemplate = _interopRequireDefault(require("./disputeMailTemplate"));

var _transactionMail = require("./transactionMail");

Object.keys(_transactionMail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transactionMail[key];
    }
  });
});

var _verifyUserMailTemplate = require("./verifyUserMailTemplate");

Object.keys(_verifyUserMailTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _verifyUserMailTemplate[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }