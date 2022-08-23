const { prisma } = require('../../lib/prisma')

class ProductRepository {

  async index() {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    return products
  }

  async findById(id) {
    const product = await prisma.product.findFirst({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: {
          select: {
            id: true,
            image_name: true,
            image_type: true
          }
        },
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                image: {
                  select: {
                    id: true,
                    image_name: true,
                    image_type: true
                  }
                }
              }
            }
          }
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        },
      },
      where: {
        id
      }
    })

    return product
  }

  async findByName(name) {
    const product = await prisma.product.findFirst({
      where: {
        name
      }
    })

    return product
  }

  async create({ name, description, price, image_id }) {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image_id
      }
    })

    return { id: newProduct.id }
  }

  async update({ id, name, description, price, image_id }) {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        description,
        price,
        image_id
      }
    })

    return product
  }

  async delete(id) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    return { id: deletedProduct.id }
  }
}

module.exports = { ProductRepository }
