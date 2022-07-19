const { FavoritesListByUserIdService } = require('../FavoritesListByUserIdService')
const { FavoritesRepositoryInMemory } = require('../../../repositories/favorites/FavoritesRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('FavoritesListByUserIdService', () => {
  const favoritesRepositoryInMemory = new FavoritesRepositoryInMemory(
    [
      { id: 11, user_id: 1, product_id: 1 },
      { id: 11, user_id: 1, product_id: 2 },
      { id: 21, user_id: 2, product_id: 1 }
    ])

  const favoritesListByUserIdService = new FavoritesListByUserIdService(favoritesRepositoryInMemory)

  test('Should throw with invalid user_id => string', async () => {
    await expect(favoritesListByUserIdService.execute('string'))
      .rejects
      .toEqual(new AppError('User id should be a number.'))
  })

  test('Should throw with invalid user_id => []', async () => {
    await expect(favoritesListByUserIdService.execute([]))
      .rejects
      .toEqual(new AppError('User id should be a number.'))
  })

  test('Should throw with invalid user_id => {}', async () => {
    await expect(favoritesListByUserIdService.execute({}))
      .rejects
      .toEqual(new AppError('User id should be a number.'))
  })

  test('Should throw with invalid user_id => null', async () => {
    await expect(favoritesListByUserIdService.execute(null))
      .rejects
      .toEqual(new AppError('User id is required.'))
  })

  test('Should throw with invalid user_id => undefined', async () => {
    await expect(favoritesListByUserIdService.execute(undefined))
      .rejects
      .toEqual(new AppError('User id is required.'))
  })

  test('should return an Array with valid id', async () => {
    const favorites = await favoritesListByUserIdService.execute(1)

    expect(favorites).toBeInstanceOf(Array)
    expect(favorites.length).toBe(2)

    favorites.forEach(fav => {
      expect(fav).toHaveProperty('product_id')
      expect(fav).toHaveProperty('user_id')
    })
  })
})