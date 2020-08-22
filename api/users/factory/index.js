import buildMakeUserFactory from './usersFactory'
import {
  makeSource,
  upperFirst,
  isValidPassword,
  isValidEmail
} from '../../helpers/utils'

const makeUser = buildMakeUserFactory({
  upperFirst,
  makeSource,
  isValidEmail,
  isValidPassword
})

export default makeUser
