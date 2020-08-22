/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const makeExpressCallback = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      pathParams: req.params,
      query: req.query,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      header: req.header,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
        'x-auth-token': req.get('x-auth-token')
      }
    }
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }

        res.type('json')
        httpResponse.redirect
          ? res.redirect(httpResponse.redirect)
          : res.status(httpResponse.statusCode).send(httpResponse.data)
      })
      .catch((e) => res.sendStatus(e.statusCode || 500).send(e.message))
  }
}

export default makeExpressCallback
