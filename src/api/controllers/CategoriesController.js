import { CategoryRepository } from '../repositories/categories/CategoryRepository.js'
import { CategoryCreateService } from '../services/categories/CategoryCreateService.js'
import { ProductRepository } from '../repositories/products/ProductRepository.js'
import { AddCategoryService } from '../services/categories/AddCategoryService.js'

export class CategoriesController {
  async index(req, res) {
    const repository = new CategoryRepository()

    const { categories } = await repository.index()

    return res.json({ categories })
  }

  async create(req, res) {
    const { name, description } = req.body

    const repository = new CategoryRepository()
    const categoryCreateService = new CategoryCreateService(repository)

    const { id } = await categoryCreateService.execute({ name, description })

    return res.status(201).json({ id })
  }

  async addProduct(req, res) {
    const { product_id, category_id } = req.body

    const categoryRepository = new CategoryRepository()
    const productRepository = new ProductRepository()

    const addCategoryService = new AddCategoryService(
      categoryRepository,
      productRepository
    )

    await addCategoryService.execute({ product_id, category_id })

    return res.status(201).send()
  }
}
