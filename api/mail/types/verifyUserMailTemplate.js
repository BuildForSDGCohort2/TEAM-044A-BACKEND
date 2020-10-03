// const getUserEmail = (userInfo) =>
//   `http://localhost:4000/api/v1/email/verify/${userInfo}`
const getUserEmail = (token) => `http://localhost:3000/confirm/${token}`

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
