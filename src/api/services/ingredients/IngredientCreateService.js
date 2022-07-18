const { AppError } = require('../../utils/AppError')

class IngredientCreateService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ name, image }) {
    if (!name) {
      throw new AppError('Nome do ingrediente é obrigatório.')
    }

    if (typeof name != 'string') {
      throw new AppError('Nome do ingrediente deve ser um texto.')
    }

    if (!image) {
      throw new AppError('Imagem do ingrediente é obrigatória.')
    }

    const ingredientWithName = await this.repository.findByName(name)

    if (ingredientWithName) {
      throw new AppError('Já existe um ingrediente cadastrado com esse nome.')
    }

    const ingredientCreatedId = await this.repository.create({ name, image })

    return ingredientCreatedId
  }
}

module.exports = { IngredientCreateService }
