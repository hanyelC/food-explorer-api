import { AppError } from '../../utils/AppError.js'

export class ProductCreateService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ categoryId, name, description, price, image_id, ingredients = [] }) {
    if (!name) {
      throw new AppError('Nome do produto é obrigatório.')
    }

    if (!description) {
      throw new AppError('Descrição do produto é obrigatória.')
    }

    if (!price) {
      throw new AppError('Preço do produto é obrigatório.')
    }

    if (!image_id) {
      throw new AppError('Imagem do produto é obrigatória.')
    }

    const productWithName = await this.repository.findByName(name)

    if (productWithName) {
      throw new AppError('Já existe um produto cadastrado com esse nome.')
    }

    const productCreatedId = await this.repository.create({
      categoryId,
      name,
      description,
      ingredients,
      price,
      image_id,
    })

    return productCreatedId
  }
}
