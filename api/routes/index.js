/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-useless-return */
import snakeCase from 'lodash/snakeCase'
import express from 'express'
import { readdirSync } from 'fs'

module.exports = (app) => {
  readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    const router = express.Router()
    const routeModule = require(require('path').join(__dirname, file))
    const path =
      routeModule.path ||
      `/${file !== 'root.js' ? snakeCase(file.replace('.js', '')) : ''}`
    const route = routeModule.config
      ? routeModule.config(router)
      : routeModule(router)
    app.use(path, route)
  })
}
