const express = require('express')
const cors = require('cors')
const app = express()
const { routes } = require('../api/routes')
const { errorHandler } = require('../api/middlewares/error')

app.use(express.json())

app.use(cors())

app.use(routes)

app.use(errorHandler)

module.exports = app
