class ProductRepositoryInMemory {
  constructor(products = []) {
    this.products = products
  }

  async index() {
    return this.products
  }

  async findById(id) {
    const product = this.products.find(prod => prod.id === id)
    return product
  }

  async findByName(name) {
    const product = this.products.find(prod => prod.name === name)
    return product
  }

  async create({ name, description, price, image }) {
    const newProduct = {
      id: Math.floor(Math.random() * 1E9),
      name,
      description,
      price,
      image
    }

    this.products.push(newProduct)

    return { id: newProduct.id }
  }

  async update({ name, description, price, image }) {

  }

  async delete(id) {
    const itemToDelete = this.products.find(prod => prod.id === id)

    const indexToDelete = this.products.indexOf(itemToDelete)

    if (indexToDelete < -1) {
      return
    }

    const deletedItem = this.favorites.splice(indexToDelete, 1)[0]

    return { id: deletedItem.id }

  }
}

module.exports = { ProductRepositoryInMemory }
