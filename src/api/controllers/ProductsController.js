const { ProductRepositoryInMemory } = require('../repositories/products/ProductRepositoryInMemory')
const { ProductCreateService } = require('../services/products/ProductCreateService')
const { ProductDeleteService } = require('../services/products/ProductDeleteService')
const { ProductsListService } = require('../services/products/ProductsListService')
const { ProductShowService } = require('../services/products/ProductShowService')
const { ProductUpdateService } = require('../services/products/ProductUpdateService')

class ProductsController {

  async index(req, res) {
    const productRepository = new ProductRepositoryInMemory()
    const productsListService = new ProductsListService(productRepository)

    const products = await productsListService.execute()

    return res.json(products)
  }

  async show(req, res) {
    const { product_id } = req.params

    const productRepository = new ProductRepositoryInMemory()
    const productShowService = new ProductShowService(productRepository)

    const product = await productShowService.execute(product_id)

    return res.json(product)
  }

  async create(req, res) {
    const { name, description, price, image } = req.body

    const productRepository = new ProductRepositoryInMemory()
    const productCreateService = new ProductCreateService(productRepository)

    const { id } = await productCreateService.execute({ name, description, price, image })

    return res.status(201).json({ id })
  }

  async update(req, res) {
    const { id, name, description, price, image } = req.body

    const productRepository = new ProductRepositoryInMemory()
    const productUpdateService = new ProductUpdateService(productRepository)

    const { id: updatedProductId } = await productUpdateService.execute({ id, name, description, price, image })

    return res.json({ id: updatedProductId })

  }

  async delete(req, res) {
    const { product_id } = req.params

    const productRepository = new ProductRepositoryInMemory()
    const productDeleteService = new ProductDeleteService(productRepository)

    await productDeleteService.execute(product_id)

    return res.status(204)
  }
}

module.exports = { ProductsController }
