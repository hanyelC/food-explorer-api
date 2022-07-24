const { Router } = require('express')
const { SessionController } = require('../controllers/SessionController')

const sessionsRouter = Router()
const sessionController = new SessionController()

sessionsRouter.post('/', sessionController.create)

module.exports = { sessionsRouter }
