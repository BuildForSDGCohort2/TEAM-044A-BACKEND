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
    // user: {
    //   id: Id.makeId()
    // },
    initiator: '5f2bb93768a73f458c1db215',
    _id: '5f2bbad770427348f84dbcf0'
  }

  return {
    ...transaction,
    ...overrides
  }
}

export default makeFakeTransaction
