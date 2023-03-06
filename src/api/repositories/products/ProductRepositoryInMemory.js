export class ProductRepositoryInMemory {
  constructor(products = []) {
    this.products = products
  }

  async index() {
    return this.products
  }

  async findById(id) {
    const product = this.products.find((prod) => prod.id === id)
    return product
  }

  async findByName(name) {
    const product = this.products.find((prod) => prod.name === name)
    return product
  }

  async create({ name, description, price, image_id }) {
    const newProduct = {
      id: Math.floor(Math.random() * 1e9),
      name,
      description,
      price,
      image_id,
    }

    this.products.push(newProduct)

    return { id: newProduct.id }
  }

  async update({ id, name, description, price, image_id }) {
    this.products = this.products.map((prod) => {
      if (prod.id === id) {
        return {
          id,
          name,
          description,
          price,
          image_id,
        }
      }

      return prod
    })

    return this.products.find((prod) => (prod.id = id))
  }

  async delete(id) {
    const itemToDelete = this.products.find((prod) => prod.id === id)

    if (itemToDelete === undefined) {
      return { id: null }
    }

    const indexToDelete = this.products.indexOf(itemToDelete)

    const deletedItem = this.products.splice(indexToDelete, 1)[0]

    return { id: deletedItem.id }
  }
}
