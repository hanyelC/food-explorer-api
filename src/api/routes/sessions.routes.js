import { Router } from 'express'
import { SessionController } from '../controllers/SessionController.js'

export const sessionsRouter = Router()
const sessionController = new SessionController()

sessionsRouter.post('/', sessionController.create)
