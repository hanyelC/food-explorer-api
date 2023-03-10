import { ImagesRepository } from '../repositories/images/ImagesRepository.js'
import { ProductRepository } from '../repositories/products/ProductRepository.js'
import { ProductCreateService } from '../services/products/ProductCreateService.js'
import { ProductDeleteService } from '../services/products/ProductDeleteService.js'
import { ProductsListService } from '../services/products/ProductsListService.js'
import { ProductShowService } from '../services/products/ProductShowService.js'
import { ProductUpdateService } from '../services/products/ProductUpdateService.js'
import { DiskStorage } from '../../providers/DiskStorage.js'

export class ProductsController {
  async index(req, res) {
    const productRepository = new ProductRepository()
    const productsListService = new ProductsListService(productRepository)

    const products = await productsListService.execute()

    return res.json(products)
  }

  async show(req, res) {
    const { product_id } = req.params

    const productRepository = new ProductRepository()
    const productShowService = new ProductShowService(productRepository)

    const product = await productShowService.execute(product_id)

    return res.json(product)
  }

  async create(req, res) {
    const { filename, mimetype } = req.file
    const { categoryId, name, description, ingredients = [], price } = req.body

    const { deleteTempFile, getTempFile } = new DiskStorage()

    const { buffer } = await getTempFile(filename)
    await deleteTempFile(filename)

    const imageRepository = new ImagesRepository()

    const imageData = await imageRepository.create({
      id: filename.split('.')[0],
      image_buffer: buffer,
      image_name: filename,
      image_type: mimetype,
    })

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)

    const { id } = await productCreateService.execute({
      categoryId: Number(categoryId),
      name,
      description,
      ingredients,
      price: Number(price),
      image_id: imageData.id,
    })

    return res.status(201).json({ id })
  }

  async update(req, res) {
    const filename = req?.file?.filename
    const mimetype = req?.file?.mimetype
    const { name, categoryId, description, ingredients, price } = req.body
    const product_id = Number(req.params.product_id)

    let imageBuffer

    if (filename) {
      const { deleteTempFile, getTempFile } = new DiskStorage()

      const { buffer } = await getTempFile(filename)
      imageBuffer = buffer
      await deleteTempFile(filename)
    }

    const productRepository = new ProductRepository()
    const productUpdateService = new ProductUpdateService(productRepository)

    const { id: updatedProductId } = await productUpdateService.execute({
      id: product_id,
      name,
      categoryId: Number(categoryId),
      description,
      price: Number(price),
      ingredients,
      image: filename ? {
        image_buffer: imageBuffer,
        image_name: filename,
        image_type: mimetype,
      } : undefined,
    })

    return res.json({ id: updatedProductId })
  }

  async delete(req, res) {
    const { product_id } = req.params

    const productRepository = new ProductRepository()
    const productDeleteService = new ProductDeleteService(productRepository)

    await productDeleteService.execute(+product_id)

    return res.sendStatus(204)
  }
}
