import { ProductsListService } from '../ProductsListService.js'
import { ProductRepositoryInMemory } from '../../../repositories/products/ProductRepositoryInMemory.js'

describe('ProductsListService', () => {
  let products = [
    {
      id: 1,
      name: 'pizza',
      description: 'pizza de trigo',
      price: 30,
      image:
        '00101101001010110101010101010101001011010101010010101010101010101',
    },
    {
      id: 2,
      name: 'pizza',
      description: 'pizza de trigo',
      price: 30,
      image:
        '00101101001010110101010101010101001011010101010010101010101010101',
    },
  ]

  let productRepositoryInMemory
  let productsListService

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory(products)
    productsListService = new ProductsListService(productRepositoryInMemory)
  })

  test('Should return an array of products', async () => {
    const productsList = await productsListService.execute()

    expect(productsList).toBeInstanceOf(Array)
    expect(productsList.length).toBe(2)
  })
})
