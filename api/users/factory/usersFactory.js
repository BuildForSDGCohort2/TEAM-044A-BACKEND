import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const buildMakeUserFactory = ({
  upperFirst,
  isValidEmail,
  isValidPassword,
  makeSource
}) => {
  return function makeUser({
    firstName = requiredParam('First name'),
    lastName = requiredParam('Last name'),
    email = requiredParam('Email'),
    phoneNumber = requiredParam('Phone number'),
    source,
    dob,
    username = requiredParam('Username'),
    password = requiredParam('Password'),
    createdOn = Date.now(),
    modifiedOn = Date.now()
  } = {}) {
    // if (firstName.length < 3) {
    //   throw new InvalidPropertyError(
    //     'First name cannot be less than 3 characters.'
    //   )
    // }
    // if (lastName.length < 3) {
    //   throw new InvalidPropertyError(
    //     'Last name cannot be less than 3 characters.'
    //   )
    // }
    if (!isValidEmail(email)) {
      throw new InvalidPropertyError('Please enter a valid email address.')
    }
    if (!source) {
      throw new InvalidPropertyError('User must have a valid source.')
    }
    if (!isValidPassword(password)) {
      throw new InvalidPropertyError(
        'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
      )
    }

    const validSource = makeSource(source)
    return Object.freeze({
      getFirstName: () => upperFirst(firstName),
      getLastName: () => upperFirst(lastName),
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email,
      getSource: () => validSource,
      getUsername: () => username,
      getPassword: () => password,
      getDOB: () => dob,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    })
  }
}

export default buildMakeUserFactory
