const buildAuthFactory = () => {
  return function makeAuth({ email, password } = {}) {
    if (!email) {
      throw new Error('Email is required.')
    }
    if (!password) {
      throw new Error('Password is required.')
    }

    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password
    })
  }
}

export default buildAuthFactory
