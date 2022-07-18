class FavoritesRepositoryInMemory {
  constructor(favorites = []) {
    this.favorites = favorites
  }

  async index() {
    return this.favorites
  }

  async findById(user_id, product_id) {
    const id = Number('' + user_id + product_id)

    const favorite = this.favorites.find(fav => fav.id === id)

    return favorite
  }

  async findByUserId(user_id) {

  }

  async findByProductId(product_id) {

  }

  async create(user_id, product_id) {
    const favorite = {
      id: Number('' + user_id + product_id),
      user_id,
      product_id
    }

    this.favorites.push(favorite)

    return { id: favorite.id }
  }

  async delete(user_id, product_id) {
    const id = Number('' + user_id + product_id)

    const itemToDelete = this.favorites.find(fav => fav.id === id)

    const indexToDelete = this.favorites.indexOf(itemToDelete)

    const deletedItem = this.favorites.splice(indexToDelete, 1)[0]

    return { id: deletedItem.id }
  }
}

module.exports = { FavoritesRepositoryInMemory }
