class ProductsListService {
  constructor(repository) {
    this.repository = repository
  }

  async execute() {
    const products = await this.repository.index()

    return products
  }
}

module.exports = { ProductsListService }
