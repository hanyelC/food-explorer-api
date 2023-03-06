import { AppError } from '../../utils/AppError.js'

export class CategoryCreateService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ name, description }) {
    if (!name) {
      throw new AppError('Nome da categoria é obrigatório.')
    }

    if (typeof name != 'string') {
      throw new AppError('Nome da categoria deve ser um texto.')
    }

    if (name.length > 50) {
      throw new AppError(
        'Nome da categoria não deve ter mais que 50 caracteres.'
      )
    }

    if (!description) {
      throw new AppError('Descrição da categoria é obrigatória.')
    }

    const categoryWithName = await this.repository.findByName(name)

    if (categoryWithName) {
      throw new AppError('Já existe uma categoria com esse nome.')
    }

    const categoryCreated = await this.repository.create({ name, description })

    return { id: categoryCreated.id }
  }
}
