"use strict";

var _ = _interopRequireDefault(require("."));

var _user = _interopRequireDefault(require("../../test/fixtures/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
describe('Users', () => {
  it('must have a first name', () => {
    const user = (0, _user.default)({
      firstName: null
    });
    expect(() => (0, _.default)(user)).toThrow('First name is required.');
  });
  it('must have a last name', () => {
    const user = (0, _user.default)({
      lastName: null
    });
    expect(() => (0, _.default)(user)).toThrow('Last name is required.');
  });
  it('must have an email', () => {
    const user = (0, _user.default)({
      email: null
    });
    expect(() => (0, _.default)(user)).toThrow('Email address is required.');
  });
  it('must have a valid email', () => {
    const user = (0, _user.default)({
      email: 'king.com'
    });
    expect(() => (0, _.default)(user)).toThrow('Please enter a valid email address.');
  });
  it('must have a phoneNumber', () => {
    const user = (0, _user.default)({
      phoneNumber: null
    });
    expect(() => (0, _.default)(user)).toThrow('Please enter a valid phone number.');
  });
  it('must have a valid source', () => {
    const noSource = (0, _user.default)({
      source: undefined
    });
    expect(() => (0, _.default)(noSource)).toThrow('User must have a valid source.');
  });
  it('must have a valid ip', () => {
    const ip = (0, _user.default)({
      source: {
        ip: undefined
      }
    });
    expect(() => (0, _.default)(ip).getSource()).toThrow('Source must have a valid ip.');
  });
  it('must have a browser', () => {
    const withBrowser = (0, _user.default)();
    expect((0, _.default)(withBrowser).getSource().getBrowser()).toBe(withBrowser.source.browser);
  });
  it('must have a referrer', () => {
    const withReferrer = (0, _user.default)();
    expect((0, _.default)(withReferrer).getSource().getReferrer()).toBe(withReferrer.source.referrer);
  });
  it('can have a dob', () => {
    const user = (0, _user.default)();
    expect((0, _.default)(user).getDOB()).toBeDefined();
  });
  it('must have a username', () => {
    const user = (0, _user.default)({
      username: null
    });
    expect(() => (0, _.default)(user)).toThrow('User must have a valid username.');
  });
  it('must have a password', () => {
    const user = (0, _user.default)({
      password: null
    });
    expect(() => (0, _.default)(user)).toThrow('Please enter a valid password.');
  });
  it('must have a valid password', () => {
    const user = (0, _user.default)({
      password: 'jessus'
    });
    expect(() => (0, _.default)(user)).toThrow('Password must be at least 8 characters long and must contain at least one Uppercase character and one special sign.');
  });
  it('must have a valid date', () => {
    const noCreatedOn = (0, _user.default)({
      createdOn: undefined
    });
    expect(noCreatedOn.createdOn).not.toBeDefined();
    const date = (0, _.default)(noCreatedOn).getCreatedOn();
    expect(date).toBeDefined();
  });
});