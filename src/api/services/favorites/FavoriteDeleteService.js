const { AppError } = require("../../utils/AppError")

class FavoriteDeleteService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ user_id, product_id }) {
    if (!user_id) {
      throw new AppError('User id is required.')
    }

    if (!product_id) {
      throw new AppError('Product id is required.')
    }

    const deletedFavorite = await this.repository.delete(user_id, product_id)

    return { id: deletedFavorite.id }
  }
}

module.exports = { FavoriteDeleteService }
