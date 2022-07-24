const { UserRepositoryInMemory } = require('../repositories/users/UserRepositoryInMemory')
const { SessionCreateService } = require('../services/sessions/SessionCreateService')

class SessionController {
  constructor() {
    this.userRepository = new UserRepositoryInMemory()
  }

  async create(req, res) {
    const { email, password } = req.body

    const sessionCreateService = new SessionCreateService(this.userRepository)

    const { user, token } = await sessionCreateService.execute({ email, password })

    return res.json({ user, token })
  }
}

module.exports = { SessionController }
