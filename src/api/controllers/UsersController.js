import { UserRepository } from '../repositories/users/UserRepository.js'
import { UserCreateService } from '../services/users/UserCreateService.js'

export class UsersController {
  async create(req, res) {
    const { name, email, password, passwordConfirm } = req.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    const { id } = await userCreateService.execute({
      name,
      email,
      password,
      passwordConfirm,
    })

    return res.status(201).json({ id })
  }
}
