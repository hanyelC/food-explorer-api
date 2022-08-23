const { Router } = require('express')
const { ProductsController } = require('../controllers/ProductsController')
const { CategoriesController } = require('../controllers/CategoriesController')
const { Auth } = require('../middlewares/auth')

const productsRouter = Router()
const productsController = new ProductsController()
const categoriesController = new CategoriesController()

const auth = new Auth()

productsRouter.use(auth.ensureLogged)

productsRouter.get('/', productsController.index)
productsRouter.get('/:product_id', productsController.show)

productsRouter.use(auth.ensureAdmin)

productsRouter.post('/', productsController.create)
productsRouter.put('/', productsController.update)
productsRouter.delete('/:product_id', productsController.delete)
productsRouter.post('/category', categoriesController.addProduct)

module.exports = { productsRouter }
