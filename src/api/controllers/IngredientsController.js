const { IngredientsRepositoryInMemory } = require('../repositories/ingredients/IngredientsRepositoryInMemory')
const { IngredientCreateService } = require('../services/ingredients/IngredientCreateService')

class IngredientsController {
  constructor() {
    this.repository = new IngredientsRepositoryInMemory()
  }

  async create(req, res) {
    const { name, image } = req.body

    const ingredientCreateService = new IngredientCreateService(this.repository)

    const { id } = await ingredientCreateService.execute({ name, image })

    return res.json(id)
  }
}

module.exports = { IngredientsController }
