import dotenv from 'dotenv'
import { urlGenerator } from '../../helpers/config'

dotenv.config()

const getUserEmail = (token) =>
  process.env.EMAIL_ENV === 'production'
    ? urlGenerator('verify', token)
    : `http://localhost:3000/email/verify/${token}`

const createVerifyEmailTemplate = (receiver, url) => {
  const from = 'etiosaserekings@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const subject = 'Please Verify Your Email'
  const html = `
    <p>Welcome ${username}🎉🎊, your account has been created successfully.</p>
    <p>Please click the link to verify your email.</p>
    <p><a href=${url}>Verify my email.</a></p>

    <p>Thank you</p>
    <p>MoneyGuard</p>
  `
  return { from, to, username, subject, html }
}

export { getUserEmail, createVerifyEmailTemplate }
