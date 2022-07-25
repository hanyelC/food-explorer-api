const { Router } = require('express')
const { CategoriesController } = require('../controllers/CategoriesController')
const { Auth } = require('../middlewares/auth')

const categoriesRouter = Router()
const categoriesController = new CategoriesController()
const auth = new Auth()

categoriesRouter.use(auth.ensureAdmin)
categoriesRouter.post('/', categoriesController.create)

module.exports = { categoriesRouter }
