import { FavoritesListByUserIdService } from '../FavoritesListByUserIdService.js'
import { FavoritesRepositoryInMemory } from '../../../repositories/favorites/FavoritesRepositoryInMemory.js'
import { AppError } from '../../../utils/AppError.js'

describe('FavoritesListByUserIdService', () => {
  const favoritesRepositoryInMemory = new FavoritesRepositoryInMemory(
    [
      { id: 11, user_id: 1, product_id: 1 },
      { id: 11, user_id: 1, product_id: 2 },
      { id: 21, user_id: 2, product_id: 1 }
    ])

  const favoritesListByUserIdService = new FavoritesListByUserIdService(favoritesRepositoryInMemory)

  test.each([
    { value: 'string' },
    { value: [] },
    { value: {} }
  ])('Should throw with invalid user_id => $value', async ({ value }) => {
    await expect(favoritesListByUserIdService.execute(value))
      .rejects
      .toEqual(new AppError('User id should be a number.'))
  })

  test.each([
    { value: null },
    { value: undefined }
  ])('Should throw with invalid user_id => undefined', async ({ value }) => {
    await expect(favoritesListByUserIdService.execute(value))
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