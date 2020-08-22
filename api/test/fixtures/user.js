import faker from 'faker'
import mongoose from 'mongoose'

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
    _id: mongoose.Types.ObjectId,
    transactions: [
      // {
      //   emailVerified: true,
      //   dateCreated: moment().valueOf(),
      //   transactionStatus: 'Awaiting Confirmation',
      //   firstName: 'King',
      //   lastName: 'Etiosa',
      //   phoneNumber: '09020491830',
      //   email: faker.internet.email(),
      //   transactionTitle: faker.commerce.productName(),
      //   transactionDesc: faker.commerce.productAdjective(),
      //   currency: 'Naira',
      //   amount: 50000,
      //   inspectionPeriod: moment().add(2, 'days'),
      //   dueDate: moment().valueOf(),
      //   reference: uuidv4(),
      //   source: {
      //     ip: faker.internet.ip(),
      //     browser: faker.internet.userAgent(),
      //     referrer: faker.internet.url()
      //   }
      // }
    ]
  }

  return {
    ...user,
    ...overrides
  }
}

export default makeFakeUser
