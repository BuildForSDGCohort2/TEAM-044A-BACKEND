/* eslint-disable no-undef */
import makeTransaction from '.'
import makeFakeTransaction from '../../test/fixtures/transaction'

describe('Transaction Factory', () => {
  it('must have a first name', () => {
    const user = makeFakeTransaction({ firstName: null })
    expect(() => makeTransaction(user)).toThrow(
      "Receiver's First name is required."
    )
  })

  it('must have a last name', () => {
    const user = makeFakeTransaction({ lastName: null })
    expect(() => makeTransaction(user)).toThrow(
      "Receiver's Last name is required."
    )
  })

  it('must have an email', () => {
    const user = makeFakeTransaction({ email: null })
    expect(() => makeTransaction(user)).toThrow("Receiver's Email is required.")
  })

  it('must have a valid email', () => {
    const user = makeFakeTransaction({ email: 'king.com' })
    expect(() => makeTransaction(user)).toThrow('Please enter a valid email.')
  })

  it('must have a phoneNumber', () => {
    const user = makeFakeTransaction({ phoneNumber: null })
    expect(() => makeTransaction(user)).toThrow(
      "Receiver's Phone number is required."
    )
  })

  it('must have a valid source', () => {
    const noSource = makeFakeTransaction({ source: undefined })
    expect(() => makeTransaction(noSource)).toThrow(
      'Buyer must have a valid source.'
    )
  })

  it('must have a valid ip', () => {
    const ip = makeFakeTransaction({ source: { ip: undefined } })
    expect(() => makeTransaction(ip).getSource()).toThrow(
      'Source must have a valid ip.'
    )
  })

  it('must have a browser', () => {
    const withBrowser = makeFakeTransaction()
    expect(makeTransaction(withBrowser).getSource().getBrowser()).toBe(
      withBrowser.source.browser
    )
  })

  it('must have a referrer', () => {
    const withReferrer = makeFakeTransaction()
    expect(makeTransaction(withReferrer).getSource().getReferrer()).toBe(
      withReferrer.source.referrer
    )
  })

  it('must have a transaction title', () => {
    const noTitle = makeFakeTransaction({ transactionTitle: undefined })
    expect(() => makeTransaction(noTitle)).toThrow(
      'Transaction title is required.'
    )
  })

  it('must have a transaction desc', () => {
    const noDesc = makeFakeTransaction({ transactionDesc: undefined })
    expect(() => makeTransaction(noDesc)).toThrow(
      'You must provide a transaction description'
    )
  })

  it('must have a currency', () => {
    const noCurrency = makeFakeTransaction({ currency: undefined })
    expect(() => makeTransaction(noCurrency)).toThrow('Please enter currency.')
  })

  it('must have an inspection period', () => {
    const noInspect = makeFakeTransaction({ inspectionPeriod: undefined })
    expect(() => makeTransaction(noInspect)).toThrow(
      'Please specify the inspection period.'
    )
  })

  it('must have a due date', () => {
    const noDate = makeFakeTransaction({ dueDate: undefined })
    expect(() => makeTransaction(noDate)).toThrow('Please specify a due date.')
  })
})
