const { ProductCreateService } = require('../ProductCreateService')
const { ProductRepositoryInMemory } = require('../../../repositories/ProductRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('ProductCreateService', () => {
  let product
  let productRepositoryInMemory
  let productCreateService

  beforeEach(() => {
    product = {
      name: 'pizza',
      description: 'pizza de trigo',
      price: 30,
      image: '00101101001010110101010101010101001011010101010010101010101010101'
    }

    productRepositoryInMemory = new ProductRepositoryInMemory()
    productCreateService = new ProductCreateService(productRepositoryInMemory)
  })

  it('Product should be created with valid data', async () => {
    const createdProduct = await productCreateService.execute(product)

    expect(createdProduct).toHaveProperty('id')
  })

  it('Product should not be created without name', async () => {
    delete product.name

    await expect(productCreateService.execute(product))
      .rejects
      .toEqual(new AppError('Nome do produto é obrigatório.'))

  })

  it('Product should not be created without description', async () => {
    delete product.description

    await expect(productCreateService.execute(product))
      .rejects
      .toEqual(new AppError('Descrição do produto é obrigatória.'))
  })

  it('Product should not be created without price', async () => {
    delete product.price

    await expect(productCreateService.execute(product))
      .rejects
      .toEqual(new AppError('Preço do produto é obrigatório.'))
  })

  it('Product should not be created without image', async () => {
    delete product.image

    await expect(productCreateService.execute(product))
      .rejects
      .toEqual(new AppError('Imagem do produto é obrigatória.'))
  })

  it('Product should not be created with name that already exists', async () => {
    await productCreateService.execute(product)

    await expect(productCreateService.execute(product))
      .rejects
      .toEqual(new AppError('Já existe um produto cadastrado com esse nome.'))
  })
})
