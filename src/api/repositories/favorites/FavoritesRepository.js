const { prisma } = require('../../lib/prisma')

class FavoritesRepository {
  async index() {
    const favorites = await prisma.favorite.findMany()

    return favorites
  }

  async findById(user_id, product_id) {
    const favorite = await prisma.favorite.findFirst({
      where: {
        fk_id_user: user_id,
        fk_id_product: product_id
      }
    })

    return favorite
  }

  async findByUserId(user_id) {
    const favorites = await prisma.favorite.findMany({
      where: {
        fk_id_user: user_id
      },

      select: {
        fk_id_product: false,
        fk_id_user: false,

        product: {
          select: {
            id: true,
            price: true,
            name: true,
            description: true,
            ingredients: true,
            categories: true
          }
        }
      }
    })

    const products = favorites.map(prod => prod.product)


    return products
  }

  async findByProductId(product_id) {
    const favorites = await prisma.favorite.findMany({
      where: {
        fk_id_product: product_id
      }
    })

    return favorites
  }

  async create(user_id, product_id) {
    const favorite = await prisma.favorite.create({
      data: {
        fk_id_user: user_id,
        fk_id_product: product_id
      }
    })

    return { id: favorite.id }
  }

  async delete(user_id, product_id) {
    const deletedItem = await prisma.favorite.delete({
      where: {
        fk_id_user_fk_id_product: {
          fk_id_user: user_id,
          fk_id_product: product_id
        }
      }
    })

    return { id: deletedItem.id }
  }
}

module.exports = { FavoritesRepository }
