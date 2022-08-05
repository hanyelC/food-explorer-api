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

    const favToDelete = await this.repository.findById(user_id, product_id)

    if (!favToDelete) {
      return
    }

    await this.repository.delete(user_id, product_id)

    return
  }
}

module.exports = { FavoriteDeleteService }
