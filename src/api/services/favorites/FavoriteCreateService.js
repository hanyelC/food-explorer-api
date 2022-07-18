const { AppError } = require("../../utils/AppError")

class FavoriteCreateService {
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

    const favoriteWithId = await this.repository.findById(user_id, product_id)

    if (favoriteWithId) {
      throw new AppError('Favorito já existe.')
    }

    const favoriteCreatedId = await this.repository.create(user_id, product_id)

    return { id: favoriteCreatedId.id }
  }
}

module.exports = { FavoriteCreateService }
