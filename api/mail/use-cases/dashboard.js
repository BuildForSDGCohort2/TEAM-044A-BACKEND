import dotenv from 'dotenv'
import { urlGenerator } from '../../helpers/config'

dotenv.config()

// process.env.NODE_ENV = 'production'

const dashboardURL = () =>
  process.env.NODE_ENV === 'production'
    ? urlGenerator('dashboard')
    : `http://localhost:3000/dashboard`

export default dashboardURL
