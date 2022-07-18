const { AppError } = require('../../../utils/AppError')
const { CategoryCreateService } = require('../CategoryCreateService')
const { CategoryRepositoryInMemory } = require('../../../repositories/categories/CategoryRepositoryInMemory')

describe('CategoryCreateService', () => {
  let category
  let categoryCreateService
  let categoryRepositoryInMemory

  beforeEach(() => {
    category = {
      name: 'foo',
      description: 'lorem ipsum description'
    }

    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    categoryCreateService = new CategoryCreateService(categoryRepositoryInMemory)

  })

  it('Category should be created with valid data', async () => {
    const categoryCreated = await categoryCreateService.execute(category)

    expect(categoryCreated).toHaveProperty('id')
  })

  it('Category should not be created without name', async () => {
    delete category.name

    await expect(categoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria é obrigatório.'))
  })

  it('Category should not be created with invalid name => {}', async () => {
    category.name = {}

    await expect(categoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria deve ser um texto.'))

  })

  it('Category should not be created with invalid name => 1', async () => {
    category.name = 1

    await expect(categoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria deve ser um texto.'))

  })

  it('Category should not be created with invalid name => []', async () => {
    category.name = []

    await expect(categoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria deve ser um texto.'))

  })

  it('Category should not be created with invalid name => 51 character name', async () => {
    category.name = 'EyqfoWsWdMBzWaqk3mwQBudnIQttG9w3X6WqDITfasdfsdafasd'

    await expect(categoryCreateService.execute(category))
      .rejects
      .toEqual(new AppError('Nome da categoria não deve ter mais que 50 caracteres.'))

  })

  it('Category should not be created with name that already exists', async () => {
    const newCategory = {
      name: 'foo'
    }

    await categoryCreateService.execute(category)

    await expect(categoryCreateService.execute(newCategory))
      .rejects
      .toEqual(new AppError('Já existe uma categoria com esse nome.'))
  })
})
