import { urlGenerator } from '../../helpers/config'

const dashboardURL = () =>
  process.env.NODE_ENV === 'production'
    ? urlGenerator('dashboard')
    : `http://localhost:3000/dashboard`

export default dashboardURL
