const express = require('express')

const { userRouter } = require('./users.routes')
const { productsRouter } = require('./products.routes')
const { favoritesRouter } = require('./favorites.routes')
const { ingredientsRouter } = require('./ingredients.routes')

const routes = express.Router()

routes.use('/users', userRouter)
routes.use('/products', productsRouter)
routes.use('/favorites', favoritesRouter)
routes.use('/ingredients', ingredientsRouter)

module.exports = { routes }
