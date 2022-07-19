const { Router } = require('express')
const { FavoriteController } = require('../controllers/FavoritesController')

const favoritesRouter = Router()

const favoriteController = new FavoriteController()

favoritesRouter.get('/', favoriteController.index)
favoritesRouter.post('/', favoriteController.create)
favoritesRouter.delete('/', favoriteController.delete)

module.exports = { favoritesRouter }
