import { RequiredParameterError } from '../../helpers/errors'

const buildAuthFactory = () => {
  return function makeAuth({ email, password } = {}) {
    if (!email) {
      throw new RequiredParameterError('Email')
    }
    if (!password) {
      throw new RequiredParameterError('Password')
    }

    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password
    })
  }
}

export default buildAuthFactory
