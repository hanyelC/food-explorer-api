const { FavoriteDeleteService } = require('../FavoriteDeleteService')
const { FavoritesRepositoryInMemory } = require('../../../repositories/favorites/FavoritesRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('FavoriteDeleteService', () => {
  let favoritesRepositoryInMemory
  let favoriteDeleteService
  let favorite

  beforeEach(() => {
    favorite = {
      id: 11,
      user_id: 1,
      product_id: 1
    }

    favoritesRepositoryInMemory = new FavoritesRepositoryInMemory([favorite])
    favoriteDeleteService = new FavoriteDeleteService(favoritesRepositoryInMemory)

  })

  it('Favorite should not be deleted without user id', async () => {
    delete favorite.user_id

    await expect(favoriteDeleteService.execute(favorite))
      .rejects
      .toEqual(new AppError('User id is required.'))
  })

  it('Favorite should not be deleted without product id', async () => {
    delete favorite.product_id

    await expect(favoriteDeleteService.execute(favorite))
      .rejects
      .toEqual(new AppError('Product id is required.'))
  })
})