/* eslint-disable no-undef */
import makeUser from '.'
import makeFakeUser from '../../test/fixtures/user'

describe('Users', () => {
  it('must have a first name', () => {
    const user = makeFakeUser({ firstName: null })
    expect(() => makeUser(user)).toThrow('First name is required.')
  })

  it('must have a last name', () => {
    const user = makeFakeUser({ lastName: null })
    expect(() => makeUser(user)).toThrow('Last name is required.')
  })

  it('must have an email', () => {
    const user = makeFakeUser({ email: null })
    expect(() => makeUser(user)).toThrow('Email address is required.')
  })

  it('must have a valid email', () => {
    const user = makeFakeUser({ email: 'king.com' })
    expect(() => makeUser(user)).toThrow('Please enter a valid email address.')
  })

  it('must have a phoneNumber', () => {
    const user = makeFakeUser({ phoneNumber: null })
    expect(() => makeUser(user)).toThrow('Please enter a valid phone number.')
  })

  it('must have a valid source', () => {
    const noSource = makeFakeUser({ source: undefined })
    expect(() => makeUser(noSource)).toThrow('User must have a valid source.')
  })

  it('must have a valid ip', () => {
    const ip = makeFakeUser({ source: { ip: undefined } })
    expect(() => makeUser(ip).getSource()).toThrow(
      'Source must have a valid ip.'
    )
  })

  it('must have a browser', () => {
    const withBrowser = makeFakeUser()
    expect(makeUser(withBrowser).getSource().getBrowser()).toBe(
      withBrowser.source.browser
    )
  })

  it('must have a referrer', () => {
    const withReferrer = makeFakeUser()
    expect(makeUser(withReferrer).getSource().getReferrer()).toBe(
      withReferrer.source.referrer
    )
  })

  it('can have a dob', () => {
    const user = makeFakeUser()
    expect(makeUser(user).getDOB()).toBeDefined()
  })

  it('must have a username', () => {
    const user = makeFakeUser({ username: null })
    expect(() => makeUser(user)).toThrow('User must have a valid username.')
  })

  it('must have a password', () => {
    const user = makeFakeUser({ password: null })
    expect(() => makeUser(user)).toThrow('Please enter a valid password.')
  })

  it('must have a valid password', () => {
    const user = makeFakeUser({ password: 'jessus' })
    expect(() => makeUser(user)).toThrow(
      'Password must be at least 8 characters long and must contain at least one Uppercase character and one special sign.'
    )
  })

  it('must have a valid date', () => {
    const noCreatedOn = makeFakeUser({ createdOn: undefined })
    expect(noCreatedOn.createdOn).not.toBeDefined()
    const date = makeUser(noCreatedOn).getCreatedOn()
    expect(date).toBeDefined()
  })
})
