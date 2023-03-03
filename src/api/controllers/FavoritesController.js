import { FavoritesRepository }from '../repositories/favorites/FavoritesRepository.js'
import { ProductRepository }from '../repositories/products/ProductRepository.js'
import { FavoriteCreateService }from '../services/favorites/FavoriteCreateService.js'
import { FavoriteDeleteService }from '../services/favorites/FavoriteDeleteService.js'
import { FavoritesListByUserIdService }from '../services/favorites/FavoritesListByUserIdService.js'
import { AppError }from '../utils/AppError.js'

export class FavoritesController {
  async index(req, res) {
    const { user_id } = req.user

    const repository = new FavoritesRepository()
    const favoritesListByUserIdService = new FavoritesListByUserIdService(repository)

    const favorites = await favoritesListByUserIdService.execute(user_id)

    return res.status(200).json(favorites)
  }

  async create(req, res) {
    const { user_id } = req.user
    const { product_id } = req.body

    const productRepository = new ProductRepository()
    const product = await productRepository.findById(product_id)

    if (!product) {
      throw new AppError('Invalid product')
    }

    const repository = new FavoritesRepository()
    const favoriteCreateService = new FavoriteCreateService(repository)

    await favoriteCreateService.execute({ user_id, product_id })

    return res.status(201).json()
  }

  async delete(req, res) {
    const { user_id } = req.user
    const { product_id } = req.body

    const repository = new FavoritesRepository()
    const favoriteDeleteService = new FavoriteDeleteService(repository)

    await favoriteDeleteService.execute({ user_id, product_id })

    return res.status(204).json()
  }
}
