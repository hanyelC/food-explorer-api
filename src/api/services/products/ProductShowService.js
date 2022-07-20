const { AppError } = require("../../utils/AppError")

class ProductShowService {
  constructor(repository) {
    this.repository = repository
  }

  async execute(product_id) {
    if (!product_id) {
      throw new AppError('Product id is required.')
    }

    if (typeof product_id != 'number') {
      throw new AppError('Product id should be a number.')
    }

    const product = await this.repository.findById(product_id)

    if (!product) {
      throw new AppError('Produto não encontrado.')
    }

    return product
  }
}

module.exports = { ProductShowService }
