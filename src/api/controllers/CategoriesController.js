const { CategoryRepositoryInMemory } = require('../repositories/categories/CategoryRepositoryInMemory')
const { CategoryCreateService } = require('../services/categories/CategoryCreateService')

class CategoriesController {
  constructor() {
    this.repository = new CategoryRepositoryInMemory()
  }

  async create(req, res) {
    const { name, description } = req.body

    const categoryCreateService = new CategoryCreateService(this.repository)

    const { id } = await categoryCreateService.execute({ name, description })

    return res.status(201).json({ id })
  }
}

module.exports = { CategoriesController }
