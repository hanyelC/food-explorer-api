const { CategoryRepository } = require('../repositories/categories/CategoryRepository')
const { CategoryCreateService } = require('../services/categories/CategoryCreateService')

class CategoriesController {
  async create(req, res) {
    const { name, description } = req.body

    const repository = new CategoryRepository()
    const categoryCreateService = new CategoryCreateService(repository)

    const { id } = await categoryCreateService.execute({ name, description })

    return res.status(201).json({ id })
  }
}

module.exports = { CategoriesController }
