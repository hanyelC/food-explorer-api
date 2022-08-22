const { prisma } = require('../../lib/prisma')

class IngredientsRepository {
  async index() {
    const ingredients = await prisma.ingredient.findMany()

    return ingredients
  }

  async findById(id) {
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id
      }
    })

    return ingredient
  }

  async findByName(name) {
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        name
      }
    })

    return ingredient
  }

  async create({ name, image_id }) {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        image_id
      }
    })

    return { id: newIngredient.id }
  }

  async update({ name, image }) {

  }

  async delete(id) {

  }
}

module.exports = { IngredientsRepository }
