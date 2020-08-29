import faker from 'faker'
import mongoose from 'mongoose'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const Id = Object.freeze({
  makeId: mongoose.Types.ObjectId
})

const makeFakeUser = (overrides) => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: '09020491830',
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referrer: faker.internet.url()
    },
    dob: faker.date.past(),
    username: faker.name.findName(),
    password: 'Jesusisreal1234!!@',
    _id: Id.makeId(),
    initiator: Id.makeId(),
    transactions: []
  }

  return {
    ...user,
    ...overrides
  }
}

export default makeFakeUser
