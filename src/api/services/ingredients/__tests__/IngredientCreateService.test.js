const { IngredientCreateService } = require('../IngredientCreateService')
const { IngredientsRepositoryInMemory } = require('../../../repositories/ingredients/IngredientsRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('IngredientCreateService', () => {
  let ingredient
  let ingredientsRepositoryInMemory
  let ingredientCreateService

  beforeEach(() => {
    ingredient = {
      name: 'foo',
      image: '0101010101100101010'
    }

    ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()
    ingredientCreateService = new IngredientCreateService(ingredientsRepositoryInMemory)
  })

  it('Ingredient should be created with valid data', async () => {
    const createdIngredient = await ingredientCreateService.execute(ingredient)

    expect(createdIngredient).toHaveProperty('id')
  })

  it('Ingredient should not be created without name', async () => {
    delete ingredient.name

    await expect(ingredientCreateService.execute(ingredient))
      .rejects
      .toEqual(new AppError('Nome do ingrediente é obrigatório.'))
  })

  it('Ingredient should not be created with invalid name => []', async () => {
    ingredient.name = []

    await expect(ingredientCreateService.execute(ingredient))
      .rejects
      .toEqual(new AppError('Nome do ingrediente deve ser um texto.'))
  })

  it('Ingredient should not be created with invalid name => {}', async () => {
    ingredient.name = {}

    await expect(ingredientCreateService.execute(ingredient))
      .rejects
      .toEqual(new AppError('Nome do ingrediente deve ser um texto.'))
  })

  it('Ingredient should not be created with invalid name => 1', async () => {
    ingredient.name = 1

    await expect(ingredientCreateService.execute(ingredient))
      .rejects
      .toEqual(new AppError('Nome do ingrediente deve ser um texto.'))
  })

  it('Ingredient should not be created with name that already exists', async () => {
    await ingredientCreateService.execute(ingredient)

    await expect(ingredientCreateService.execute(ingredient))
      .rejects
      .toEqual(new AppError('Já existe um ingrediente cadastrado com esse nome.'))
  })

  it('Ingredient should not be created without image', async () => {
    delete ingredient.image

    await expect(ingredientCreateService.execute(ingredient))
      .rejects
      .toEqual(new AppError('Imagem do ingrediente é obrigatória.'))
  })
})