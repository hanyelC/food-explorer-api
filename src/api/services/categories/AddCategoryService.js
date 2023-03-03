import { AppError } from '../../utils/AppError.js'

export class AddCategoryService {
  constructor(categoryRepository, productRepository) {
    this.categoryRepository = categoryRepository
    this.productRepository = productRepository
  }

  async execute({ product_id, category_id }) {
    if (!product_id) {
      throw new AppError('Product id is required')
    }

    if (!category_id) {
      throw new AppError('Category id is required')
    }

    if (typeof product_id !== 'number') {
      throw new AppError('Product is must be a number.')
    }

    if (typeof category_id !== 'number') {
      throw new AppError('Category is must be a number.')
    }

    const product = await this.productRepository.findById(product_id)

    if (!product) {
      throw new AppError('Invalid product id')
    }

    const productAlreadyInCategory = product.categories.find(item => {
      return item.category.id === category_id
    })

    if (productAlreadyInCategory) {
      throw new AppError('Product already exists on this category.', 200)
    }

    const category = await this.categoryRepository.findById(category_id)

    if (!category) {
      throw new AppError('Invalid category id')
    }

    await this.productRepository.addCategory(product_id, category_id)

    return
  }
}
