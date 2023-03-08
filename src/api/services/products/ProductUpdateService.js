import { ImagesRepository } from '../../repositories/images/ImagesRepository.js'
import { AppError } from '../../utils/AppError.js'

export class ProductUpdateService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ id, name, description, price, image, ingredients }) {
    if (!id) {
      throw new AppError('Id do produto é obrigatório.')
    }

    if (typeof id != 'number') {
      throw new AppError('Id do produto deve ser um número.')
    }

    const product = await this.repository.findById(id)

    if (!product) {
      throw new AppError('Produto não encontrado.')
    }

    if (!name) {
      throw new AppError('Nome do produto é obrigatório.')
    }

    if (typeof name != 'string') {
      throw new AppError('Nome do produto deve ser um texto.')
    }

    if (!description) {
      throw new AppError('Descrição do produto é obrigatória.')
    }

    if (typeof description != 'string') {
      throw new AppError('Descrição do produto deve ser um texto.')
    }

    if (!price) {
      throw new AppError('Preço do produto é obrigatório.')
    }

    if (typeof price != 'number') {
      throw new AppError('Preço do produto deve ser um número.')
    }

    let image_id
    
    if (image) {
      const { image_buffer, image_name, image_type } = image

      const imageRepository = new ImagesRepository()

      const imageData = await imageRepository.create({
        id: image_name.split('.')[0],
        image_buffer,
        image_name,
        image_type,
      })

      image_id = imageData.id
    }

    const productWithName = await this.repository.findByName(name)

    if (productWithName && productWithName.id != id) {
      throw new AppError('Já existe um produto cadastrado com esse nome.')
    }

    const prod = await this.repository.update({
      id,
      name,
      description,
      price,
      image_id,
      ingredients,
    })

    return prod
  }
}
