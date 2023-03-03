import { AppError } from '../../utils/AppError.js'

export class ProductDeleteService {
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

    const deletedItem = await this.repository.delete(product_id)

    return { id: deletedItem.id }
  }
}
