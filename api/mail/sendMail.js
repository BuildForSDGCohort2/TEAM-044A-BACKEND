/* eslint-disable no-console */
import sendGrid from '@sendgrid/mail'

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
const sendMail = async ({ emailTemplate }) => {
  try {
    return await sendGrid.send(emailTemplate)
  } catch (error) {
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

export default sendMail
