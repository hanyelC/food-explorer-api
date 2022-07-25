const { Router } = require('express')
const { FavoriteController } = require('../controllers/FavoritesController')
const { Auth } = require('../middlewares/auth')

const favoritesRouter = Router()
const favoriteController = new FavoriteController()
const auth = new Auth()

favoritesRouter.use(auth.ensureLogged)

favoritesRouter.get('/', favoriteController.index)
favoritesRouter.post('/', favoriteController.create)
favoritesRouter.delete('/', favoriteController.delete)

module.exports = { favoritesRouter }
