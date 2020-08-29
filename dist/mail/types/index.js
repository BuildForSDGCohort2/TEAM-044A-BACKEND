"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _acceptanceMail = require("./acceptanceMail");

Object.keys(_acceptanceMail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _acceptanceMail[key];
    }
  });
});

var _rejectionEmail = require("./rejectionEmail");

Object.keys(_rejectionEmail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rejectionEmail[key];
    }
  });
});

var _sendAcceptanceMail = require("./sendAcceptanceMail");

Object.keys(_sendAcceptanceMail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sendAcceptanceMail[key];
    }
  });
});

var _deliveryTemplate = require("./deliveryTemplate");

Object.keys(_deliveryTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deliveryTemplate[key];
    }
  });
});

var _confirmMailTemplate = require("./confirmMailTemplate");

Object.keys(_confirmMailTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _confirmMailTemplate[key];
    }
  });
});

var _transactionMail = require("./transactionMail");

Object.keys(_transactionMail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transactionMail[key];
    }
  });
});

var _inProgressTemplate = require("./inProgressTemplate");

Object.keys(_inProgressTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inProgressTemplate[key];
    }
  });
});

var _deliveryRejectTemplate = require("./deliveryRejectTemplate");

Object.keys(_deliveryRejectTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deliveryRejectTemplate[key];
    }
  });
});

var _disputeMailTemplate = require("./disputeMailTemplate");

Object.keys(_disputeMailTemplate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _disputeMailTemplate[key];
    }
  });
});