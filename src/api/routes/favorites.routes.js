const { Router } = require('express')
const { FavoritesController } = require('../controllers/FavoritesController')
const { Auth } = require('../middlewares/auth')

const favoritesRouter = Router()
const favoritesController = new FavoritesController()
const auth = new Auth()

favoritesRouter.use(auth.ensureLogged)

favoritesRouter.get('/', favoritesController.index)
favoritesRouter.post('/', favoritesController.create)
favoritesRouter.delete('/', favoritesController.delete)

module.exports = { favoritesRouter }
