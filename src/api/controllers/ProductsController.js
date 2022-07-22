const { ProductRepositoryInMemory } = require('../repositories/products/ProductRepositoryInMemory')
const { ProductCreateService } = require('../services/products/ProductCreateService')
const { ProductDeleteService } = require('../services/products/ProductDeleteService')
const { ProductsListService } = require('../services/products/ProductsListService')
const { ProductShowService } = require('../services/products/ProductShowService')
const { ProductUpdateService } = require('../services/products/ProductUpdateService')

class ProductsController {
  constructor() {
    this.productRepository = new ProductRepositoryInMemory()
  }

  async index(req, res) {
    const productsListService = new ProductsListService(this.productRepository)

    const products = await productsListService.execute()

    return res.json(products)
  }

  async show(req, res) {
    const { product_id } = req.params

    const productShowService = new ProductShowService(this.productRepository)

    const product = await productShowService.execute(product_id)

    return res.json(product)
  }

  async create(req, res) {
    const { name, description, price, image } = req.body

    const productCreateService = new ProductCreateService(this.productRepository)

    const { id } = await productCreateService.execute({ name, description, price, image })

    return res.status(201).json({ id })
  }

  async update(req, res) {
    const { id, name, description, price, image } = req.body

    const productUpdateService = new ProductUpdateService(this.productRepository)

    const { id: updatedProductId } = await productUpdateService.execute({ id, name, description, price, image })

    return res.json({ id: updatedProductId })

  }

  async delete(req, res) {
    const { product_id } = req.params

    const productDeleteService = new ProductDeleteService(this.productRepository)

    await productDeleteService.execute(product_id)

    return res.status(204)
  }
}

module.exports = { ProductsController }
