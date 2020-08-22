import faker from 'faker'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Id = Object.freeze({
  makeId: mongoose.Types.ObjectId
})
const makeFakeTransaction = (overrides) => {
  const transaction = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    transactionTitle: faker.commerce.productName(),
    transactionDesc: faker.commerce.productAdjective(),
    currency: 'Naira',
    inspectionPeriod: 2,
    dueDate: faker.date.future(),
    transactionStatus: 'Awaiting Confirmation',
    reference: uuidv4(),
    amount: 3000,
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referrer: faker.internet.url()
    },
    user: {
      id: Id.makeId()
    },
    dob: faker.date.past(),
    username: faker.name.findName(),
    password: faker.internet.password(),
    _id: Id.makeId()
  }

  return {
    ...transaction,
    ...overrides
  }
}

export default makeFakeTransaction
