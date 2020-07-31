const express = require('express')
const consign = require('consign')

const app = express()

app.set('json spaces', 4)

consign({ verbose: false })
  .include('libs/configs/index.js')
  .then('db.js')
  .then('auth.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)

module.exports = app
