import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import {
  makeSource,
  upperFirst,
  isValidAmount,
  isValidEmail
} from '../../helpers/utils'
import buildMakeTransactionFactory from './transactionFactory'

const makeTransaction = buildMakeTransactionFactory({
  makeSource,
  upperFirst,
  uuidv4,
  isValidAmount,
  isValidEmail,
  moment
})
export default makeTransaction
