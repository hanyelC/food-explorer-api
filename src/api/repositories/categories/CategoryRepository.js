const { prisma } = require('../../lib/prisma')

class CategoryRepository {
  async findByName(name) {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    })

    return category
  }

  async create({ name, description }) {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description
      }
    })

    return newCategory
  }
}

module.exports = { CategoryRepository }
