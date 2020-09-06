const paystack = (request) => {
  const initializePayment = (form, mycallback) => {
    const options = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        Authorization: process.env.PAYSTACK_BEARER_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      },
      form
    }
    const callback = (error, response, data) => {
      return mycallback(error, data)
    }
    request.post(options, callback)
  }

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url:
        `https://api.paystack.co/transaction/verify/${  encodeURIComponent(ref)}`,
      headers: {
        Authorization: process.env.PAYSTACK_BEARER_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      }
    }
    const callback = (error, response, body) => {
      return mycallback(error, body)
    }
    request(options, callback)
  }

  return { initializePayment, verifyPayment }
}

module.exports = paystack
