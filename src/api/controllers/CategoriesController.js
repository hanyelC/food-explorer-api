const { CategoryRepository } = require('../repositories/categories/CategoryRepository')
const { CategoryCreateService } = require('../services/categories/CategoryCreateService')
const { ProductRepository } = require('../repositories/products/ProductRepository')
const { AddCategoryService } = require('../services/categories/AddCategoryService')

class CategoriesController {
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

    const addCategoryService = new AddCategoryService(categoryRepository, productRepository)

    await addCategoryService.execute({ product_id, category_id })

    return res.status(201).send()
  }
}

module.exports = { CategoriesController }
