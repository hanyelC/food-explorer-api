const { FavoritesRepositoryInMemory } = require('../repositories/favorites/FavoritesRepositoryInMemory')
const { FavoriteCreateService } = require('../services/favorites/FavoriteCreateService')
const { FavoriteDeleteService } = require('../services/favorites/FavoriteDeleteService')
const { FavoritesListByUserIdService } = require('../services/favorites/FavoritesListByUserIdService')
const { AppError } = require('../utils/AppError')

class FavoriteController {
  async index(req, res) {
    const { user_id } = req.body

    const favoritesRepositoryInMemory = new FavoritesRepositoryInMemory()
    const favoritesListByUserIdService = new FavoritesListByUserIdService(favoritesRepositoryInMemory)

    const favorites = await favoritesListByUserIdService.execute(user_id)

    return res.json(favorites)
  }

  async create(req, res) {
    if (!req.user) {
      throw new AppError('Faça login novamente.')
    }
    const { user_id } = req.user
    const { product_id } = req.body

    const favoritesRepositoryInMemory = new FavoritesRepositoryInMemory()
    const favoriteCreateService = new FavoriteCreateService(favoritesRepositoryInMemory)

    const createdFavoriteId = await favoriteCreateService.execute({ user_id, product_id })

    return res.status(201).json(createdFavoriteId)
  }

  async delete(req, res) {
    if (!req.user) {
      throw new AppError('Faça login novamente.')
    }

    const { user_id } = req.user
    const { product_id } = req.body

    const favoritesRepositoryInMemory = new FavoritesRepositoryInMemory()
    const favoriteDeleteService = new FavoriteDeleteService(favoritesRepositoryInMemory)

    const { id } = await favoriteDeleteService.execute({ user_id, product_id })

    return res.status(200).json({ id })
  }
}

module.exports = { FavoriteController }
