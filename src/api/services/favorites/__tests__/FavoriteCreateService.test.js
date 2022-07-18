const { FavoriteCreateService } = require('../FavoriteCreateService')
const { FavoritesRepositoryInMemory } = require('../../../repositories/favorites/FavoritesRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('FavoriteCreateService', () => {
  let user_id
  let product_id
  let favoriteCreateService
  let favoritesRepositoryInMemory

  beforeEach(() => {
    user_id = 1
    product_id = 1

    favoritesRepositoryInMemory = new FavoritesRepositoryInMemory()
    favoriteCreateService = new FavoriteCreateService(favoritesRepositoryInMemory)
  })

  it('Favorite should be created with valid data', async () => {
    const createdFavorite = await favoriteCreateService.execute({ user_id, product_id })

    expect(createdFavorite).toHaveProperty('id')
    expect(createdFavorite.id).toBe(11)
  })

  it('Favorite should not be created without user id', async () => {
    await expect(favoriteCreateService.execute({ product_id }))
      .rejects
      .toEqual(new AppError('User id is required.'))
  })

  it('Favorite should not be created without product id', async () => {
    await expect(favoriteCreateService.execute({ user_id }))
      .rejects
      .toEqual(new AppError('Product id is required.'))
  })

  it('Favorite that already exists should not be created', async () => {
    await favoriteCreateService.execute({ user_id, product_id })

    await expect(favoriteCreateService.execute({ user_id, product_id }))
      .rejects
      .toEqual(new AppError('Favorito já existe.'))
  })
})
