import { prisma } from '../../lib/prisma.js'

export class CategoryRepository {
  async index() {
    const categories = await prisma.category.findMany()

    return { categories }
  }

  async findByName(name) {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    })

    return category
  }

  async findById(id) {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    })

    return category
  }

  async create({ name, description }) {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    })

    return newCategory
  }
}
