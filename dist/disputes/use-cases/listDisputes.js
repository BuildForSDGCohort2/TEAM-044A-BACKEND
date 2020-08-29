"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeListDisputes = ({
  disputeDb
}) => {
  return async function listDisputes({
    id
  } = {}) {
    return id ? await disputeDb.findById({
      id
    }) : await disputeDb.findAll();
  };
};

var _default = makeListDisputes;
exports.default = _default;