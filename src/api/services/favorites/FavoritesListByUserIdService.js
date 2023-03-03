import { AppError } from '../../utils/AppError.js'

export class FavoritesListByUserIdService {
  constructor(repository) {
    this.repository = repository
  }

  async execute(user_id) {
    if (!user_id) {
      throw new AppError('User id is required.')
    }

    if (typeof user_id != 'number') {
      throw new AppError('User id should be a number.')
    }

    const favorites = await this.repository.findByUserId(user_id)

    return favorites
  }
}
