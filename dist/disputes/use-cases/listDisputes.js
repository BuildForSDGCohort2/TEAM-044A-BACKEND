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
    const found = id ? await disputeDb.findById({
      id
    }) : await disputeDb.findAll();
    return found;
  };
};

var _default = makeListDisputes;
exports.default = _default;