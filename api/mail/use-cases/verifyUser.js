import { InvalidPropertyError } from '../../helpers/errors'

const buildMakeVerifyUser = ({
  usersDb,
  createToken,
  createVerifyEmailTemplate,
  getUserEmail,
  sendMail
}) => {
  return async function verifyUser(msg) {
    const receiver = await usersDb.findById({ id: msg })
    if (!receiver) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const toSend = {
      email: receiver.email,
      userId: receiver.id,
      isVerified: receiver.isVerified
    }
    const token = createToken(toSend)
    const url = getUserEmail(token)
    const emailTemplate = createVerifyEmailTemplate(receiver, url)
    return sendMail({ emailTemplate })
  }
}

export default buildMakeVerifyUser
