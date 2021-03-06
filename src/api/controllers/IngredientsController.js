const { IngredientsRepositoryInMemory } = require('../repositories/ingredients/IngredientsRepositoryInMemory')
const { IngredientCreateService } = require('../services/ingredients/IngredientCreateService')

class IngredientsController {
  async create(req, res) {
    const { name, image } = req.body

    const repository = new IngredientsRepositoryInMemory()
    const ingredientCreateService = new IngredientCreateService(repository)

    const { id } = await ingredientCreateService.execute({ name, image })

    return res.json(id)
  }
}

module.exports = { IngredientsController }
