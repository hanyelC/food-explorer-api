const { AppError } = require('../../../utils/AppError')
const { ProductCategoryCreateService } = require('../ProductCategoryCreateService')
const { ProductCategoryRepositoryInMemory } = require('../../../repositories/ProductCategoryRepositoryInMemory')

describe('ProductCategoryCreateService', () => {
  let category
  let productCategoryCreateService
  let productCategoryRepositoryInMemory

  beforeEach(() => {
    category = {
      name: 'foo',
      description: 'lorem ipsum description'
    }

    productCategoryRepositoryInMemory = new ProductCategoryRepositoryInMemory()
    productCategoryCreateService = new ProductCategoryCreateService(productCategoryRepositoryInMemory)

  })

  it('Category should be created with valid data', async () => {
    const categoryCreated = await productCategoryCreateService.execute(category)

    expect(categoryCreated).toHaveProperty('id')
  })

  it('Category should not be created without name', async () => {
    delete category.name

    await expect(productCategoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria é obrigatório.'))
  })

  it('Category should not be created with invalid name => {}', async () => {
    category.name = {}

    await expect(productCategoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria deve ser um texto.'))

  })

  it('Category should not be created with invalid name => 1', async () => {
    category.name = 1

    await expect(productCategoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria deve ser um texto.'))

  })

  it('Category should not be created with invalid name => []', async () => {
    category.name = []

    await expect(productCategoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria deve ser um texto.'))

  })

  it('Category should not be created with invalid name => 51 character name', async () => {
    category.name = 'EyqfoWsWdMBzWaqk3mwQBudnIQttG9w3X6WqDITfasdfsdafasd'

    await expect(productCategoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria não deve ter mais que 50 caracteres.'))

  })

  it('Category should not be created with name that already exists', async () => {
    const newCategory = {
      name: 'foo'
    }

    await productCategoryCreateService.execute(category)

    await expect(productCategoryCreateService.execute(newCategory))
      .rejects
      .toEqual(new AppError('Já existe uma categoria com esse nome.'))
  })
})
