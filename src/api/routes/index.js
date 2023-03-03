import express from 'express'

import { UPLOADS_FOLDER } from '../../config/upload.js'

import { userRouter } from './users.routes.js'
import { productsRouter } from './products.routes.js'
import { favoritesRouter } from './favorites.routes.js'
import { ingredientsRouter } from './ingredients.routes.js'
import { categoriesRouter } from './categories.routes.js'
import { sessionsRouter } from './sessions.routes.js'
import { imagesRouter } from './images.routes.js'

export const routes = express.Router()

routes.get('/', (req, res) => {
  return res.json({ message: "Food explorer API" })
})

routes.use('/files', express.static(UPLOADS_FOLDER))

routes.use('/session', sessionsRouter)
routes.use('/users', userRouter)
routes.use('/products', productsRouter)
routes.use('/favorites', favoritesRouter)
routes.use('/ingredients', ingredientsRouter)
routes.use('/categories', categoriesRouter)
routes.use('/images', imagesRouter)
