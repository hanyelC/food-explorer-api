import express from 'express'
import cors from 'cors'
import { routes } from '../api/routes/index.js'
import { errorHandler } from '../api/middlewares/error.js'

export const app = express()

app.use(express.json())

app.use(cors())

app.use(routes)

app.use(errorHandler)
