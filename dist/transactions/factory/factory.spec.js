"use strict";

var _ = _interopRequireDefault(require("."));

var _transaction = _interopRequireDefault(require("../../test/fixtures/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
describe('Transaction Factory', () => {
  it('must have a first name', () => {
    const user = (0, _transaction.default)({
      firstName: null
    });
    expect(() => (0, _.default)(user)).toThrow("Receiver's First name is required.");
  });
  it('must have a last name', () => {
    const user = (0, _transaction.default)({
      lastName: null
    });
    expect(() => (0, _.default)(user)).toThrow("Receiver's Last name is required.");
  });
  it('must have an email', () => {
    const user = (0, _transaction.default)({
      email: null
    });
    expect(() => (0, _.default)(user)).toThrow("Receiver's Email is required.");
  });
  it('must have a valid email', () => {
    const user = (0, _transaction.default)({
      email: 'king.com'
    });
    expect(() => (0, _.default)(user)).toThrow('Please enter a valid email.');
  });
  it('must have a phoneNumber', () => {
    const user = (0, _transaction.default)({
      phoneNumber: null
    });
    expect(() => (0, _.default)(user)).toThrow("Receiver's Phone number is required.");
  });
  it('must have a valid source', () => {
    const noSource = (0, _transaction.default)({
      source: undefined
    });
    expect(() => (0, _.default)(noSource)).toThrow('Buyer must have a valid source.');
  });
  it('must have a valid ip', () => {
    const ip = (0, _transaction.default)({
      source: {
        ip: undefined
      }
    });
    expect(() => (0, _.default)(ip).getSource()).toThrow('Source must have a valid ip.');
  });
  it('must have a browser', () => {
    const withBrowser = (0, _transaction.default)();
    expect((0, _.default)(withBrowser).getSource().getBrowser()).toBe(withBrowser.source.browser);
  });
  it('must have a referrer', () => {
    const withReferrer = (0, _transaction.default)();
    expect((0, _.default)(withReferrer).getSource().getReferrer()).toBe(withReferrer.source.referrer);
  });
  it('must have a transaction title', () => {
    const noTitle = (0, _transaction.default)({
      transactionTitle: undefined
    });
    expect(() => (0, _.default)(noTitle)).toThrow('Transaction title is required.');
  });
  it('must have a transaction desc', () => {
    const noDesc = (0, _transaction.default)({
      transactionDesc: undefined
    });
    expect(() => (0, _.default)(noDesc)).toThrow('You must provide a transaction description');
  });
  it('must have a currency', () => {
    const noCurrency = (0, _transaction.default)({
      currency: undefined
    });
    expect(() => (0, _.default)(noCurrency)).toThrow('Please enter currency.');
  });
  it('must have an inspection period', () => {
    const noInspect = (0, _transaction.default)({
      inspectionPeriod: undefined
    });
    expect(() => (0, _.default)(noInspect)).toThrow('Please specify the inspection period.');
  });
  it('must have a due date', () => {
    const noDate = (0, _transaction.default)({
      dueDate: undefined
    });
    expect(() => (0, _.default)(noDate)).toThrow('Please specify a due date.');
  });
});