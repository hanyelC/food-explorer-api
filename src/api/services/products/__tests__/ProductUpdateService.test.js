const { ProductUpdateService } = require('../ProductUpdateService')
const { ProductRepositoryInMemory } = require('../../../repositories/products/ProductRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('ProductUpdateService', () => {
  let newProductData
  let productRepositoryInMemory
  let productUpdateService
  const products = [
    {
      id: 1,
      name: 'pizza',
      description: 'pizza de trigo',
      price: 30,
      image: '00101101001010110101010101010101001011010101010010101010101010101'
    },
    {
      id: 2,
      name: 'foo',
      description: 'lorem ipsum',
      price: 30,
      image: '00101101001010110101010101010101001011010101010010101010101010101'
    }
  ]

  beforeEach(() => {
    newProductData = {
      id: 1,
      name: 'foo baz',
      description: 'another',
      price: 30,
      image: '00101101001010110101010101010101001011010101010010101010101010101'
    }
    productRepositoryInMemory = new ProductRepositoryInMemory(products)
    productUpdateService = new ProductUpdateService(productRepositoryInMemory)
  })

  test('Product should be updated with valid data', async () => {
    const updatedProduct = await productUpdateService.execute(newProductData)

    expect(updatedProduct).toStrictEqual(newProductData)
  })

  test.each([
    { item: 'id', errorMessage: 'Id do produto é obrigatório.' },
    { item: 'name', errorMessage: 'Nome do produto é obrigatório.' },
    { item: 'description', errorMessage: 'Descrição do produto é obrigatória.' },
    { item: 'price', errorMessage: 'Preço do produto é obrigatório.' },
    { item: 'image', errorMessage: 'Imagem do produto é obrigatória.' },
  ])('Product should not be updated without $item', async ({ item, errorMessage }) => {
    delete newProductData[item]

    await expect(productUpdateService.execute(newProductData))
      .rejects
      .toEqual(new AppError(errorMessage))
  })

  test.each([
    { value: 'string' },
    { value: [] },
    { value: {} },
    { value: () => 1 }
  ])('Product should note be updated with invalid id => $value', async ({ value }) => {
    newProductData.id = value

    await expect(productUpdateService.execute(newProductData))
      .rejects
      .toEqual(new AppError('Id do produto deve ser um número.'))
  })

  test.each([
    { value: 1 },
    { value: [] },
    { value: {} },
    { value: () => 'true' }
  ])('Product should not be updated with invalid name => $value', async ({ value }) => {
    newProductData.name = value

    await expect(productUpdateService.execute(newProductData))
      .rejects
      .toEqual(new AppError('Nome do produto deve ser um texto.'))
  })

  test.each([
    { value: 1 },
    { value: [] },
    { value: {} },
    { value: () => 'true' }
  ])('Product should not be updated with invalid description => $value', async ({ value }) => {
    newProductData.description = value

    await expect(productUpdateService.execute(newProductData))
      .rejects
      .toEqual(new AppError('Descrição do produto deve ser um texto.'))
  })

  test.each([
    { value: 'string' },
    { value: [] },
    { value: {} },
    { value: () => 1 }
  ])('Product should note be updated with invalid price => $value', async ({ value }) => {
    newProductData.price = value

    await expect(productUpdateService.execute(newProductData))
      .rejects
      .toEqual(new AppError('Preço do produto deve ser um número.'))
  })

  test('Product should not be updated to a name that already exists', async () => {
    newProductData.name = 'foo'

    await await expect(productUpdateService.execute(newProductData))
      .rejects
      .toEqual(new AppError('Já existe um produto cadastrado com esse nome.'))
  })
})