const express = require('express')

const { userRouter } = require('./users.routes')
const { productsRouter } = require('./products.routes')
const { favoritesRouter } = require('./favorites.routes')
const { ingredientsRouter } = require('./ingredients.routes')
const { categoriesRouter } = require('./categories.routes')
const { sessionsRouter } = require('./sessions.routes')
const { imagesRouter } = require('./images.routes')

const routes = express.Router()

routes.get('/ok', (req, res) => {
  res.json({ ok: "OK" })
})

routes.use('/session', sessionsRouter)
routes.use('/users', userRouter)
routes.use('/products', productsRouter)
routes.use('/favorites', favoritesRouter)
routes.use('/ingredients', ingredientsRouter)
routes.use('/categories', categoriesRouter)
routes.use('/images', imagesRouter)

module.exports = { routes }
