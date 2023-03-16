export class ProductsListService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ search }) {
    const products = await this.repository.index({ search })

    return products
  }
}
