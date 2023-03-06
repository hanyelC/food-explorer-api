import { AppError } from '../../utils/AppError.js'

export class ProductShowService {
  constructor(repository) {
    this.repository = repository
  }

  async execute(product_id) {
    if (!product_id) {
      throw new AppError('Product id is required.')
    }

    product_id = Number(product_id)

    if (
      typeof product_id != 'number' ||
      isNaN(product_id) ||
      product_id === 0
    ) {
      throw new AppError('Product id should be a number.')
    }

    const product = await this.repository.findById(product_id)

    if (!product) {
      throw new AppError('Produto não encontrado.')
    }

    return product
  }
}
