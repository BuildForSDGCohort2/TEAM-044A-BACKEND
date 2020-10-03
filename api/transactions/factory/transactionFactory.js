/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const buildMakeTransactionFactory = ({
  makeSource,
  isValidAmount,
  isValidEmail,
  uuidv4,
  upperFirst,
  moment
}) => {
  return function makeTransaction({
    firstName = requiredParam('First name'),
    lastName = requiredParam('Last name'),
    phoneNumber = requiredParam('Phone number'),
    email = requiredParam('Email'),
    transactionTitle = requiredParam('Transaction Title'),
    transactionDesc = requiredParam('Transaction Description'),
    currency = requiredParam('Currency'),
    inspectionPeriod = requiredParam('Inspection Period'),
    dueDate = requiredParam('Due date'),
    source = requiredParam('Source'),
    amount = requiredParam('Amount')
  } = {}) {
    if (!isValidEmail(email)) {
      throw new InvalidPropertyError('Email is invalid')
    }
    if (!isValidAmount(amount)) {
      throw new InvalidPropertyError('Amount is invalid')
    }

    let reference
    const validSource = makeSource(source)
    const validInspectionPeriod = moment()
      .add(inspectionPeriod, 'days')
      .valueOf()
    const validDueDate = moment(dueDate).valueOf()
    function makeReference() {
      return uuidv4()
    }

    return Object.freeze({
      getFirstName: () => upperFirst(firstName),
      getLastName: () => upperFirst(lastName),
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email.toLowerCase(),
      getTitle: () => upperFirst(transactionTitle),
      getDesc: () => transactionDesc,
      getCurrency: () => currency,
      getInspectionPeriod: () => validInspectionPeriod,
      getDueDate: () => validDueDate,
      getSource: () => validSource,
      getAmount: () => amount * 100,
      getRef: () => reference || (reference = makeReference())
    })
  }
}

export default buildMakeTransactionFactory
