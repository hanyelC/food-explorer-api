const { Router } = require('express')
const { CategoriesController } = require('../controllers/CategoriesController')

const categoriesRouter = Router()
const categoriesController = new CategoriesController()

categoriesRouter.post('/', categoriesController.create)

module.exports = { categoriesRouter }
