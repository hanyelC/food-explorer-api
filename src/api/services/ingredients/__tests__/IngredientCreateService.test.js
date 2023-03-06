import { IngredientCreateService } from '../IngredientCreateService.js'
import { IngredientsRepositoryInMemory } from '../../../repositories/ingredients/IngredientsRepositoryInMemory.js'
import { AppError } from '../../../utils/AppError.js'

describe('IngredientCreateService', () => {
  let ingredient
  let ingredientsRepositoryInMemory
  let ingredientCreateService

  beforeEach(() => {
    ingredient = {
      name: 'foo',
      image_id: '0101010101100101010',
    }

    ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()
    ingredientCreateService = new IngredientCreateService(
      ingredientsRepositoryInMemory
    )
  })

  it('Ingredient should be created with valid data', async () => {
    const createdIngredient = await ingredientCreateService.execute(ingredient)

    expect(createdIngredient).toHaveProperty('id')
  })

  it('Ingredient should not be created without name', async () => {
    delete ingredient.name

    await expect(ingredientCreateService.execute(ingredient)).rejects.toEqual(
      new AppError('Nome do ingrediente é obrigatório.')
    )
  })

  test.each([{ value: [] }, { value: {} }, { value: 1 }])(
    'Ingredient should not be created with invalid name => $value',
    async ({ value }) => {
      ingredient.name = value

      await expect(ingredientCreateService.execute(ingredient)).rejects.toEqual(
        new AppError('Nome do ingrediente deve ser um texto.')
      )
    }
  )

  it('Ingredient should not be created with name that already exists', async () => {
    await ingredientCreateService.execute(ingredient)

    await expect(ingredientCreateService.execute(ingredient)).rejects.toEqual(
      new AppError('Já existe um ingrediente cadastrado com esse nome.')
    )
  })

  it('Ingredient should not be created without image', async () => {
    delete ingredient.image_id

    await expect(ingredientCreateService.execute(ingredient)).rejects.toEqual(
      new AppError('Imagem do ingrediente é obrigatória.')
    )
  })
})
