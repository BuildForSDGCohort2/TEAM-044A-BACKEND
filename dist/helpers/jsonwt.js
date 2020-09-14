"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.hashPassword = exports.verifyToken = exports.decodeToken = exports.sendTokenResponse = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createToken = userId => {
  return _jsonwebtoken.default.sign(userId, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

exports.createToken = createToken;

const sendTokenResponse = userId => {
  const token = createToken(userId);
  return JSON.stringify({
    token
  });
};

exports.sendTokenResponse = sendTokenResponse;

const decodeToken = details => {
  return _jsonwebtoken.default.decode(details);
};

exports.decodeToken = decodeToken;

const verifyToken = token => {
  return _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
};

exports.verifyToken = verifyToken;

const hashPassword = async password => {
  const salt = await _bcryptjs.default.genSalt(12);
  const hashed = await _bcryptjs.default.hash(password, salt);
  return hashed;
};

exports.hashPassword = hashPassword;

const validatePassword = async (password, password2) => {
  const validPassord = await _bcryptjs.default.compare(password, password2);
  return validPassord;
};

exports.validatePassword = validatePassword;