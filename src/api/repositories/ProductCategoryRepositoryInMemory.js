class ProductCategoryRepositoryInMemory {
  constructor(categories = []) {
    this.categories = categories
  }

  async findById(id) {
    const category = this.categories.find(category => category.id === id)
    return category
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name)
    return category
  }

  async create({ name, description }) {
    newCategory = {
      id: Math.floor(Math.random() * 1E9),
      name,
      description
    }

    this.categories.push(category)

    return newCategory
  }

  async update({ id, name, description }) {
    this.categories = this.categories.map(category => {
      if (category.id === id) {
        return {
          id,
          name,
          description
        }
      }

      return category
    })
  }
}

module.exports = { ProductCategoryRepositoryInMemory }
