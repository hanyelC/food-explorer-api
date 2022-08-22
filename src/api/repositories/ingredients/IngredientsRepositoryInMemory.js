class IngredientsRepositoryInMemory {
  constructor(ingredients = []) {
    this.ingredients = ingredients
  }

  async index() {
    return this.ingredients
  }

  async findById(id) {
    const ingredient = this.ingredients.find(ing => ing.id === id)
    return ingredient
  }

  async findByName(name) {
    const ingredient = this.ingredients.find(ing => ing.name === name)
    return ingredient
  }

  async create({ name, image_id }) {
    const newIngredient = {
      id: Math.floor(Math.random() * 1E9),
      name,
      image_id
    }

    this.ingredients.push(newIngredient)

    return { id: newIngredient.id }
  }

  async update({ name, image }) {

  }

  async delete(id) {

  }
}

module.exports = { IngredientsRepositoryInMemory }
