const { UserRepository } = require('../repositories/users/UserRepository')
const { SessionCreateService } = require('../services/sessions/SessionCreateService')

class SessionController {
  async create(req, res) {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const sessionCreateService = new SessionCreateService(userRepository)

    const { user, token } = await sessionCreateService.execute({ email, password })

    return res.json({ user, token })
  }
}

module.exports = { SessionController }
