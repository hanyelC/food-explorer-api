const { UserRepository } = require('../repositories/users/UserRepository')
const { UserCreateService } = require('../services/users/UserCreateService')

class UsersController {
  async create(req, res) {
    const { name, email, password, passwordConfirm } = req.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    const { id } = await userCreateService.execute({ name, email, password, passwordConfirm })

    return res.status(201).json({ id })
  }
}

module.exports = { UsersController }
