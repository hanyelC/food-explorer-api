const { ProductDeleteService } = require('../ProductDeleteService')
const { ProductRepositoryInMemory } = require('../../../repositories/products/ProductRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('ProductDeleteService', () => {
  let products = [
    {
      id: 1,
      name: 'pizza',
      description: 'pizza de trigo',
      price: 30,
      image: '00101101001010110101010101010101001011010101010010101010101010101'
    },
    {
      id: 2,
      name: 'pizza',
      description: 'pizza de trigo',
      price: 30,
      image: '00101101001010110101010101010101001011010101010010101010101010101'
    }
  ]

  let productRepositoryInMemory
  let productDeleteService

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory(products)
    productDeleteService = new ProductDeleteService(productRepositoryInMemory)
  })

  test('Should delete product with id 1', async () => {
    const deletedItem = await productDeleteService.execute(1)

    expect(deletedItem).toHaveProperty('id')
    expect(deletedItem.id).toBe(1)
  })

  test('Should delete product with id 2', async () => {
    const deletedItem = await productDeleteService.execute(2)

    expect(deletedItem).toHaveProperty('id')
    expect(deletedItem.id).toBe(2)
  })

  test('Should throw an App error without id', async () => {
    await expect(productDeleteService.execute())
      .rejects
      .toEqual(new AppError('Product id is required.'))
  })

  test('Should throw an App error with invalid id => []', async () => {
    await expect(productDeleteService.execute([]))
      .rejects
      .toEqual(new AppError('Product id should be a number.'))
  })

  test('Should throw an App error with invalid id => {}', async () => {
    await expect(productDeleteService.execute({}))
      .rejects
      .toEqual(new AppError('Product id should be a number.'))
  })

  test('Should throw an App error with invalid id => string', async () => {
    await expect(productDeleteService.execute('string'))
      .rejects
      .toEqual(new AppError('Product id should be a number.'))
  })

  test('Should not delete an product that don\'t exits', async () => {
    const deletedItem = await productDeleteService.execute(5)

    expect(deletedItem).toHaveProperty('id')
    expect(deletedItem.id).toBe(null)
  })
  
})