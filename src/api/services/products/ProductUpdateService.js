const { AppError } = require("../../utils/AppError")

class ProductUpdateService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ id, name, description, price, image_id }) {
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

    if (!image_id) {
      throw new AppError('Imagem do produto é obrigatória.')
    }

    const productWithName = await this.repository.findByName(name)

    if (productWithName && productWithName.id != id) {
      throw new AppError('Já existe um produto cadastrado com esse nome.')
    }

    const prod = await this.repository.update({ id, name, description, price, image_id })

    return prod
  }
}

module.exports = { ProductUpdateService }
