/* eslint-disable no-console */
import ipRegex from 'ip-regex'
import cron from 'cron'

const { CronJob } = cron

// To get the ip address of the buyer
const buildMakeSource = ({ isValidIp }) => {
  return function makeSource({ ip, browser, referrer } = {}) {
    if (!isValidIp(ip)) {
      throw new Error('Source must have a valid ip.')
    }

    if (!ip) {
      throw new Error('Source must have an ip.')
    }

    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer
    })
  }
}

const isValidIp = (ip) => {
  return ipRegex({ exact: true }).test(ip)
}

// Final export of the makeSource function.
const makeSource = buildMakeSource({ isValidIp })

/**
 * Utitlity functions,
 * To capitalize the first letter
 */

const upperFirst = (word) => {
  if (word.length === 1) {
    return word
  }

  return word[0].toUpperCase() + word.substring(1)
}

/**
 * Email and Password Validation
 * Using RegExp
 */

const isValidEmail = (email) => {
  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  return valid.test(email)
}

const isValidPassword = (password) => {
  const validate = new RegExp(
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
  )
  return validate.test(password)
}

const isValidAmount = (amount) => {
  const valid = new RegExp(/^[0-9]+$/)
  return valid.test(amount)
}

/**
 *  CRON-JOB FOR SENDING MONEY FROM ESCROW TO SELLER ACCOUNT
 *
 */
const setCronJob = (func) => {
  const job = new CronJob('* * * * * *', func)
  job.start()
}

export {
  makeSource,
  upperFirst,
  setCronJob,
  isValidEmail,
  isValidAmount,
  isValidPassword
}
