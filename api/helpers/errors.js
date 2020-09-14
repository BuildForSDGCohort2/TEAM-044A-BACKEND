/* eslint-disable max-classes-per-file */
class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} cannot be null or undefined.`)

    this.name = 'RequiredParameterError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError)
    }
  }
}

class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must be unique.`)

    this.name = 'UniqueConstraintError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg)

    this.name = 'InvalidPropertyError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError)
    }
  }
}

class UnauthorizedError extends Error {
  constructor(message, statusCode = 401) {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = statusCode

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

class DatabaseError extends Error {
  constructor(message, statusCode = 503) {
    super(message)
    this.name = 'MongoDBError'
    this.statusCode = statusCode

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError)
    }
  }
}

class SendGridError extends Error {
  constructor(message, statusCode = 400) {
    super(message)

    this.name = 'SendGridError'
    this.statusCode = statusCode

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SendGridError)
    }
  }
}

export {
  RequiredParameterError,
  InvalidPropertyError,
  UniqueConstraintError,
  UnauthorizedError,
  DatabaseError,
  SendGridError
}
