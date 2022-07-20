const { Router } = require('express')
const { ProductsController } = require('../controllers/ProductsController')

const productsRouter = Router()
const productsController = new ProductsController()

// logged users only

productsRouter.get('/', productsController.index)
productsRouter.get('/:product_id', productsController.show)

// admin only

productsRouter.post('/', productsController.create)
productsRouter.put('/', productsController.update)
productsRouter.delete('/:product_id', productsController.delete)

module.exports = { productsRouter }
