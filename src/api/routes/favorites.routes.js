import { Router } from 'express'
import { FavoritesController } from '../controllers/FavoritesController.js'
import { Auth } from '../middlewares/auth.js'

export const favoritesRouter = Router()
const favoritesController = new FavoritesController()
const auth = new Auth()

favoritesRouter.use(auth.ensureLogged)

favoritesRouter.get('/', favoritesController.index)
favoritesRouter.post('/', favoritesController.create)
favoritesRouter.delete('/', favoritesController.delete)
