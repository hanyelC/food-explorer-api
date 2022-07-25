const { Router } = require('express')
const { IngredientsController } = require('../controllers/IngredientsController')
const { Auth } = require('../middlewares/auth')

const ingredientsRouter = Router()
const ingredientsController = new IngredientsController()

ingredientsRouter.post('/', ingredientsController.create)

module.exports = { ingredientsRouter }
