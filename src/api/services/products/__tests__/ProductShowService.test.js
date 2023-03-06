import { ProductShowService } from '../ProductShowService.js'
import { ProductRepositoryInMemory } from '../../../repositories/products/ProductRepositoryInMemory.js'
import { AppError } from '../../../utils/AppError.js'

describe('ProductShowService', () => {
  let productRepositoryInMemory
  let productShowService
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
      name: 'foo',
      description: 'lorem ipsum',
      price: 45,
      image: '010101010101001011010101010010101010101010101',
    },
  ]

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory(products)
    productShowService = new ProductShowService(productRepositoryInMemory)
  })

  test('Should return product 1', async () => {
    const product = await productShowService.execute(1)

    expect(product).toStrictEqual(products[0])
  })

  test('Should return product 2', async () => {
    const product = await productShowService.execute(2)

    expect(product).toStrictEqual(products[1])
  })

  test('Should throw without id', async () => {
    await expect(productShowService.execute()).rejects.toEqual(
      new AppError('Product id is required.')
    )
  })

  test.each([{ value: [] }, { value: {} }, { value: 'string' }])(
    'Should throw with invalid id => $value',
    async ({ value }) => {
      await expect(productShowService.execute(value)).rejects.toEqual(
        new AppError('Product id should be a number.')
      )
    }
  )

  test("Should throw with an id that does't exits", async () => {
    await expect(productShowService.execute(5)).rejects.toEqual(
      new AppError('Produto não encontrado.')
    )
  })
})
