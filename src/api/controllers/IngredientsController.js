const { IngredientsRepository } = require('../repositories/ingredients/IngredientsRepository')
const { IngredientCreateService } = require('../services/ingredients/IngredientCreateService')

class IngredientsController {
  async create(req, res) {
    const { name, image_id } = req.body

    const repository = new IngredientsRepository()
    const ingredientCreateService = new IngredientCreateService(repository)

    const { id } = await ingredientCreateService.execute({ name, image_id })

    return res.json(id)
  }
}

module.exports = { IngredientsController }
