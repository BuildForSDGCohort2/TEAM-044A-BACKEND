import dotenv from 'dotenv'
import { urlGenerator } from '../../helpers/config'

dotenv.config()

const dashboardURL = () =>
  process.env.EMAIL_ENV === 'production'
    ? urlGenerator('dashboard')
    : `http://localhost:3000/dashboard`

export default dashboardURL
